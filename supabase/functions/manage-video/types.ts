export interface VideoRequestBody {
  action: 'getUploadUrl' | 'deleteVideo';
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  originalName?: string;
  userId: string;
  procedure_id?: string;
  student_id?: string;
}

export interface VideoFileMetadata {
  file_name: string;
  gcs_path: string;
  mime_type: string;
  size: number;
  original_name: string;
  user_id: string;
  status: 'uploading' | 'uploaded' | 'error';
  error_message?: string;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  gcsUrl: string;
  fileId: string;
  analysisId: string;
}
