import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

export class AnalysisService {
  private supabase;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getActiveTemplate() {
    const { data, error } = await this.supabase
      .from('evaluation_prompts')
      .select('*')
      .eq('active', true)
      .single();

    if (error) throw error;
    return data;
  }

  async getProcedureChecklist(procedureId: string) {
    const { data: checklist, error } = await this.supabase
      .from('checklist_items')
      .select('*')
      .eq('procedure_id', procedureId)
      .eq('active', true)
      .order('order_number', { ascending: true });

    if (error) throw error;
    return checklist;
  }

  async getProcedureName(procedureId: string) {
    const { data, error } = await this.supabase
      .from('medical_procedures')
      .select('name')
      .eq('id', procedureId)
      .single();

    if (error) throw error;
    return data;
  }

  async createAnalysis(analysisData: any) {
    const { data, error } = await this.supabase
      .from('video_analyses')
      .insert(analysisData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAnalysisStatus(analysisId: string, status: string, errorMessage?: string) {
    const updateData: any = { status };
    if (errorMessage) {
      updateData.error_message = errorMessage;
    }

    const { error } = await this.supabase
      .from('video_analyses')
      .update(updateData)
      .eq('id', analysisId);

    if (error) throw error;
  }

  async invokeAnalysis(videoUri: string, studentId: string, userId: string, prompt: string, checklist: any[]) {
    const { error } = await this.supabase.functions.invoke('analyze-video', {
      body: {
        video_uri: videoUri,
        student_id: studentId,
        user_id: userId,
        prompt,
        checklist
      }
    });

    if (error) throw error;
  }
}
