export type ChecklistType = 'global' | 'institutional' | 'personal';
export type ChecklistStatus = 'active' | 'inactive';

export interface ChecklistTemplate {
  id: string;
  institution_id: string | null;
  name: string;
  description: string | null;
  created_by: string;
  type: ChecklistType;
  status: ChecklistStatus;
  created_at: string;
  updated_at: string;
  items?: ChecklistItem[];
  is_global?: boolean;
  is_editable?: boolean;
  procedure_type?: string;
}

export interface ChecklistItem {
  id: string;
  template_id: string;
  description: string;
  order_index: number;
  required: boolean;
  weight: number;
  created_at: string;
  updated_at: string;
}

export interface CreateChecklistInput {
  name: string;
  description?: string;
  institution_id?: string;
  type: ChecklistType;
  is_global?: boolean;
  is_editable?: boolean;
  procedure_type?: string;
}

export interface UpdateChecklistInput {
  name?: string;
  description?: string;
  status?: ChecklistStatus;
  is_global?: boolean;
  is_editable?: boolean;
  procedure_type?: string;
}
