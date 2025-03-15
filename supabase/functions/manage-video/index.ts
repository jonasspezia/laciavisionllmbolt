import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';
import { VideoRequestBody } from './types.ts';
import { GCSService } from './gcsService.ts';
import { FileService } from './fileService.ts';
import { AnalysisService } from './analysisService.ts';

serve(async (req) => {
  console.log("[manage-video] Nova requisição recebida");

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate GCS credentials
    const credentials = Deno.env.get('GCS_CREDENTIALS');
    if (!credentials) {
      throw new Error('GCS_CREDENTIALS environment variable is not set');
    }

    let parsedCredentials;
    try {
      parsedCredentials = JSON.parse(credentials);
    } catch (error) {
      throw new Error(`Invalid GCS credentials: ${error.message}`);
    }

    // Parse request body
    const requestBody: VideoRequestBody = await req.json();
    const { action, fileName, fileType, fileSize, originalName, userId, procedure_id, student_id } = requestBody;
    
    if (!action) throw new Error('Action is required');
    if (!userId || typeof userId !== 'string') throw new Error('Valid userId is required');

    // Initialize services
    const gcsService = new GCSService(parsedCredentials);
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not found');
    }

    const fileService = new FileService(supabaseUrl, supabaseKey);
    const analysisService = new AnalysisService(supabaseUrl, supabaseKey);

    switch (action) {
      case 'getUploadUrl': {
        if (!fileName || !fileType) {
          throw new Error('fileName and fileType are required for getUploadUrl');
        }

        // Sanitize file name
        const sanitizedFileName = fileName.replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, '_');
        const cleanFileName = sanitizedFileName.replace(/^videos\//, '').replace(/^videos\\/, '');
        const timestamp = Date.now();
        const filePath = `videos/${timestamp}-${cleanFileName}`;
        
        // Generate upload URL
        const uploadUrl = await gcsService.generateUploadUrl(filePath, fileType);
        const gcsPath = gcsService.getGcsPath(filePath);

        // Create file record
        const fileData = await fileService.createFileRecord({
          file_name: cleanFileName,
          gcs_path: gcsPath,
          mime_type: fileType,
          size: fileSize || 0,
          original_name: originalName || cleanFileName,
          user_id: userId,
          status: 'uploading'
        });

        // Get active template and checklist
        const template = await analysisService.getActiveTemplate();
        const checklist = await analysisService.getProcedureChecklist(procedure_id!);
        const procedure = await analysisService.getProcedureName(procedure_id!);

        const checklistWithProcedure = checklist.map(item => ({
          ...item,
          procedure_name: procedure.name
        }));

        // Create analysis record
        const analysisData = await analysisService.createAnalysis({
          video_uri: gcsPath,
          student_id,
          user_id: userId,
          status: 'aguardando_upload',
          procedure_name: procedure.name,
          procedure_id,
          video_file_id: fileData.id,
          checklist_version: checklistWithProcedure
        });

        // Set up upload monitoring
        const monitorUpload = async () => {
          try {
            await gcsService.verifyBucket();
            await fileService.updateFileStatus(fileData.id, 'uploaded');
            await analysisService.updateAnalysisStatus(analysisData.id, 'processando');
            
            await analysisService.invokeAnalysis(
              gcsPath,
              student_id!,
              userId,
              template.context_template,
              checklistWithProcedure
            );
          } catch (error) {
            console.error("[manage-video] Error in upload monitoring:", error);
            await fileService.updateFileStatus(fileData.id, 'error', error.message);
            await analysisService.updateAnalysisStatus(analysisData.id, 'erro', error.message);
          }
        };

        // Start monitoring after 30 seconds
        setTimeout(monitorUpload, 30000);

        return new Response(
          JSON.stringify({
            uploadUrl,
            gcsUrl: gcsPath,
            fileId: fileData.id,
            analysisId: analysisData.id
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'deleteVideo': {
        if (!fileName) {
          throw new Error('fileName is required for deleteVideo');
        }

        await gcsService.deleteFile(fileName);
        
        return new Response(
          JSON.stringify({ message: 'Video deleted successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        throw new Error(`Invalid action: ${action}`);
    }
  } catch (error) {
    console.error("[manage-video] Erro na função:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
});
