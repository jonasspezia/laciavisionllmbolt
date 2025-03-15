import { supabase } from '@/integrations/supabase/client';
import { CreateChecklistInput, UpdateChecklistInput } from '@/types/checklist';
import { UseChecklistsOptions } from './types';
import { convertToTemplate } from './utils';

export const fetchChecklists = async ({ type, institutionId }: UseChecklistsOptions) => {
  let query = supabase
    .from('checklist_templates')
    .select(`
      *,
      items:checklist_items(*)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  if (institutionId) {
    query = query.eq('institution_id', institutionId);
  }

  return query;
};

export const createChecklistInDb = async (input: CreateChecklistInput) => {
  return supabase
    .from('checklist_templates')
    .insert([{
      ...input,
      is_global: input.is_global || false,
      status: 'active'
    }])
    .select(`
      *,
      items:checklist_items(*)
    `)
    .single();
};

export const updateChecklistInDb = async (id: string, input: UpdateChecklistInput) => {
  return supabase
    .from('checklist_templates')
    .update({
      ...input,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select(`
      *,
      items:checklist_items(*)
    `)
    .single();
};

export const deleteChecklistInDb = async (id: string) => {
  return supabase
    .from('checklist_templates')
    .delete()
    .eq('id', id);
};
