export type AnalysisType = 'technical' | 'safety' | 'efficiency';

export interface DetailedAnalysis {
  id: string;
  video_analysis_id: string;
  prompt_template_id: string;
  checklist_template_id: string;
  analysis_type: AnalysisType;
  timestamp: number | null;
  observation: string;
  score: number;
  metadata: Record<string, any> | null;
  created_at: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string | null;
  base_template: string;
  procedure_type: string;
  version: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnalysisResult {
  technical_score: number;
  safety_score: number;
  efficiency_score: number;
  overall_score: number;
  detailed_analyses: DetailedAnalysis[];
  timestamps: Array<{
    time: number;
    type: AnalysisType;
    observation: string;
  }>;
  recommendations: string[];
}

export interface VideoAnalysisRequest {
  video_uri: string;
  student_id: string;
  checklist: Array<{
    description: string;
    procedure_name: string;
  }>;
  prompt_template_id: string;
}
