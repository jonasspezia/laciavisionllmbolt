import { ChecklistTemplate, ChecklistType } from '@/types/checklist';

export const isValidType = (type: string): type is ChecklistType => {
  return ['global', 'institutional', 'personal'].includes(type);
};

export const convertToTemplate = (data: any): ChecklistTemplate | null => {
  if (!isValidType(data.type)) {
    console.error(`Invalid checklist type: ${data.type}`);
    return null;
  }

  return {
    id: data.id,
    institution_id: data.institution_id,
    name: data.name,
    description: data.description,
    created_by: data.created_by,
    type: data.type,
    status: data.status || 'active',
    created_at: data.created_at,
    updated_at: data.updated_at,
    items: data.items,
    is_global: data.is_global || false,
    is_editable: data.is_editable,
    procedure_type: data.procedure_type
  };
};
