export interface EvaluationPrompt {
  id: string;
  context_template: string;
  created_at: string;
  updated_at: string;
}

export interface MedicalProcedure {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChecklistItem {
  id: string;
  procedure_id: string;
  description: string;
  order_number: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoFile {
  id: string;
  user_id: string;
  file_name: string;
  gcs_path: string;
  mime_type: string;
  size: number;
  original_name: string;
  duration: number | null;
  status: 'uploaded' | 'processing' | 'ready' | 'error';
  created_at: string;
  updated_at: string;
}

export interface VideoAnalysis {
  id: string;
  user_id: string;
  student_id: string;
  video_uri: string;
  status: string;
  analysis_result: any | null;
  error_message: string | null;
  procedure_name: string | null;
  video_file_id: string | null;
  checklist_version: Record<string, any> | null;
  analysis_metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface Institution {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  institution_id: string | null;
  role: 'admin' | 'institution_admin' | 'professor' | 'student';
  specialty: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  institution?: Institution;
}

interface Settings {
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      settings: {
        Row: Settings;
        Insert: Omit<Settings, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Settings, 'created_at' | 'updated_at'>>;
      };
      // ... outras tabelas aqui se necessário
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
  };
};
