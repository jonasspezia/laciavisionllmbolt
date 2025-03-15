import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { VideoFileMetadata } from './types.ts';

export class FileService {
  private supabase;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async createFileRecord(metadata: VideoFileMetadata) {
    const { data, error } = await this.supabase
      .from('video_files')
      .insert(metadata)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateFileStatus(fileId: string, status: string, errorMessage?: string) {
    const updateData: Partial<VideoFileMetadata> = { status };
    if (errorMessage) {
      updateData.error_message = errorMessage;
    }

    const { error } = await this.supabase
      .from('video_files')
      .update(updateData)
      .eq('id', fileId);

    if (error) throw error;
  }
}
