import { VideoAnalysisRequest } from './types.ts';

export function validateRequest(data: any): VideoAnalysisRequest {
  if (!data.video_uri || typeof data.video_uri !== 'string') {
    throw new Error('Missing or invalid video_uri');
  }
  if (!data.student_id || typeof data.student_id !== 'string') {
    throw new Error('Missing or invalid student_id');
  }
  if (!data.user_id || typeof data.user_id !== 'string') {
    throw new Error('Missing or invalid user_id');
  }
  if (!data.prompt_template_id || typeof data.prompt_template_id !== 'string') {
    throw new Error('Missing or invalid prompt_template_id');
  }
  if (!Array.isArray(data.checklist)) {
    throw new Error('Invalid checklist format');
  }

  return data as VideoAnalysisRequest;
}
