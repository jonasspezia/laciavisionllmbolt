import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { ChecklistTemplate } from '@/types/checklist';
import { convertToTemplate } from './utils';
import { Database } from '@/integrations/supabase/types';

export const subscribeToChanges = (
  client: SupabaseClient<Database>,
  type: string | undefined,
  callback: (updater: (currentTemplates: ChecklistTemplate[]) => ChecklistTemplate[]) => void
): RealtimeChannel => {
  const channel = client
    .channel('checklist-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'checklist_templates'
      },
      (payload) => {
        console.log('Realtime update:', payload);
        const { eventType, new: newRecord, old: oldRecord } = payload;

        callback((currentTemplates) => {
          switch (eventType) {
            case 'INSERT':
              if (!type || newRecord.type === type) {
                const newTemplate = convertToTemplate(newRecord);
                if (newTemplate) {
                  return [newTemplate, ...currentTemplates];
                }
              }
              return currentTemplates;

            case 'DELETE':
              return currentTemplates.filter(template => template.id !== oldRecord.id);

            case 'UPDATE':
              return currentTemplates.map(template =>
                template.id === newRecord.id ?
                  convertToTemplate(newRecord) ?? template :
                  template
              );

            default:
              return currentTemplates;
          }
        });
      }
    )
    .subscribe();

  return channel;
};
