export interface DatabaseVideo {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  content_type: string;
  size: number;
  status: 'uploading' | 'processing' | 'analyzed' | 'error' | null;
  created_at: string;
  created_by: string;
}

export interface DatabaseAnalysis {
  id: string;
  video_id: string;
  user_id: string;
  created_at: string;
  created_by: string;
  
  // Scores
  overall_score: number | null;
  technical_score: number | null;
  technique_score: number | null;
  safety_score: number | null;
  efficiency_score: number | null;
  
  // Feedback e análise
  status: 'pending' | 'analyzing' | 'completed' | 'error' | null;
  feedback: string[] | null;
  timestamps: any[] | null;
  gemini_response: any | null;
}

export interface ChecklistTemplate {
  id: string;
  institution_id: string | null;
  name: string;
  description: string | null;
  created_by: string | null;
  type: 'global' | 'institutional' | 'personal';
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ChecklistItem {
  id: string;
  template_id: string;
  description: string;
  order_number: number;
  required: boolean;
  weight: number;
  created_at: string;
  updated_at: string;
}
