import { ChecklistTemplate, ChecklistType } from '@/types/checklist';

export interface UseChecklistsOptions {
  type?: ChecklistType;
  institutionId?: string;
}

export interface ChecklistState {
  templates: ChecklistTemplate[];
  loading: boolean;
  error: Error | null;
}
