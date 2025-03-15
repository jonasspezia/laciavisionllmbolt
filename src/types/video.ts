export interface VideoItem {
  id: string;
  file_name: string;
  file_path: string;
  thumbnail_url?: string;
  status: string;
  created_at: string;
  created_by: string;
  overall_score?: number;
  efficiency_score?: number;
  technical_score?: number;
  safety_score?: number;
  analysis_feedback?: {
    general?: string;
    strengths?: string[];
    improvements?: string[];
    technical?: string;
    safety?: string;
  };
  analysis_result?: {
    summary?: string;
    checklistAnalysis?: {
      items: {
        item: string;
        status: 'correto' | 'incorreto' | 'anulado';
        justificativa: string;
        tempo: string;
      }[];
    };
    resumoGeral?: string;
  };
}
