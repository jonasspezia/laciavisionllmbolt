export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      checklist_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          order_index: number
          required: boolean | null
          template_id: string | null
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          order_index: number
          required?: boolean | null
          template_id?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          order_index?: number
          required?: boolean | null
          template_id?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "checklist_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          has_video_example: boolean | null
          id: string
          institution_id: string | null
          is_editable: boolean | null
          is_global: boolean | null
          name: string
          procedure_type: string | null
          status: Database["public"]["Enums"]["checklist_status"] | null
          type: Database["public"]["Enums"]["checklist_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          has_video_example?: boolean | null
          id?: string
          institution_id?: string | null
          is_editable?: boolean | null
          is_global?: boolean | null
          name: string
          procedure_type?: string | null
          status?: Database["public"]["Enums"]["checklist_status"] | null
          type: Database["public"]["Enums"]["checklist_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          has_video_example?: boolean | null
          id?: string
          institution_id?: string | null
          is_editable?: boolean | null
          is_global?: boolean | null
          name?: string
          procedure_type?: string | null
          status?: Database["public"]["Enums"]["checklist_status"] | null
          type?: Database["public"]["Enums"]["checklist_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_templates_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          institution_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          specialty: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          institution_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialty?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          institution_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialty?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      video_analyses: {
        Row: {
          analysis_metadata: Json | null
          checklist_data: Json | null
          created_at: string | null
          created_by: string | null
          efficiency_score: number | null
          error_details: Json | null
          feedback: Json | null
          gemini_response: Json | null
          id: string
          overall_score: number | null
          processing_completed_at: string | null
          processing_started_at: string | null
          safety_score: number | null
          status: string | null
          technical_score: number | null
          technique_score: number | null
          timestamps: Json | null
          user_id: string | null
          video_id: string | null
        }
        Insert: {
          analysis_metadata?: Json | null
          checklist_data?: Json | null
          created_at?: string | null
          created_by?: string | null
          efficiency_score?: number | null
          error_details?: Json | null
          feedback?: Json | null
          gemini_response?: Json | null
          id?: string
          overall_score?: number | null
          processing_completed_at?: string | null
          processing_started_at?: string | null
          safety_score?: number | null
          status?: string | null
          technical_score?: number | null
          technique_score?: number | null
          timestamps?: Json | null
          user_id?: string | null
          video_id?: string | null
        }
        Update: {
          analysis_metadata?: Json | null
          checklist_data?: Json | null
          created_at?: string | null
          created_by?: string | null
          efficiency_score?: number | null
          error_details?: Json | null
          feedback?: Json | null
          gemini_response?: Json | null
          id?: string
          overall_score?: number | null
          processing_completed_at?: string | null
          processing_started_at?: string | null
          safety_score?: number | null
          status?: string | null
          technical_score?: number | null
          technique_score?: number | null
          timestamps?: Json | null
          user_id?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_analyses_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_uploads: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          analysis_feedback: Json | null
          content_type: string | null
          created_at: string | null
          created_by: string | null
          duration: number | null
          efficiency_score: number | null
          file_name: string
          file_path: string
          id: string
          overall_score: number | null
          processed_at: string | null
          safety_score: number | null
          size: number | null
          status: string | null
          technical_score: number | null
          thumbnail_url: string | null
        }
        Insert: {
          analysis_feedback?: Json | null
          content_type?: string | null
          created_at?: string | null
          created_by?: string | null
          duration?: number | null
          efficiency_score?: number | null
          file_name: string
          file_path: string
          id?: string
          overall_score?: number | null
          processed_at?: string | null
          safety_score?: number | null
          size?: number | null
          status?: string | null
          technical_score?: number | null
          thumbnail_url?: string | null
        }
        Update: {
          analysis_feedback?: Json | null
          content_type?: string | null
          created_at?: string | null
          created_by?: string | null
          duration?: number | null
          efficiency_score?: number | null
          file_name?: string
          file_path?: string
          id?: string
          overall_score?: number | null
          processed_at?: string | null
          safety_score?: number | null
          size?: number | null
          status?: string | null
          technical_score?: number | null
          thumbnail_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      checklist_status: "active" | "inactive"
      checklist_type: "global" | "institutional" | "personal"
      user_role: "admin" | "institution_admin" | "professor" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
