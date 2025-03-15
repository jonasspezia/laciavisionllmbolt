import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ChecklistTemplate, CreateChecklistInput, UpdateChecklistInput } from '@/types/checklist';
import { UseChecklistsOptions } from './checklists/types';
import { convertToTemplate } from './checklists/utils';
import { fetchChecklists, createChecklistInDb, updateChecklistInDb, deleteChecklistInDb } from './checklists/api';
import { subscribeToChanges } from './checklists/realtime';
import { supabase } from '@/integrations/supabase/client';

export const useChecklists = ({ type, institutionId }: UseChecklistsOptions = {}) => {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadChecklists = async () => {
    try {
      const { data, error } = await fetchChecklists({ type, institutionId });
      
      if (error) throw error;

      const validTemplates = (data || [])
        .map(convertToTemplate)
        .filter((template): template is ChecklistTemplate => template !== null);

      setTemplates(validTemplates);
      setError(null);
    } catch (err) {
      console.error('Error loading checklists:', err);
      setError(err as Error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar checklists",
        description: "Não foi possível carregar os templates de checklist.",
        duration: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChecklists();
    const channel = subscribeToChanges(supabase, type, setTemplates);
    return () => {
      channel.unsubscribe();
    };
  }, [type, institutionId]);

  const createChecklist = async (input: CreateChecklistInput) => {
    try {
      const { data, error } = await createChecklistInDb(input);

      if (error) throw error;

      const newTemplate = convertToTemplate(data);
      if (newTemplate) {
        toast({
          title: "Template criado",
          description: "O template de checklist foi criado com sucesso.",
          duration: 3000
        });
        return newTemplate;
      }
    } catch (err) {
      console.error('Error creating checklist:', err);
      toast({
        variant: "destructive",
        title: "Erro ao criar template",
        description: "Não foi possível criar o template de checklist.",
        duration: 3000
      });
      throw err;
    }
  };

  const updateChecklist = async (id: string, input: UpdateChecklistInput) => {
    try {
      const { data, error } = await updateChecklistInDb(id, input);

      if (error) throw error;

      const updatedTemplate = convertToTemplate(data);
      if (updatedTemplate) {
        toast({
          title: "Template atualizado",
          description: "O template de checklist foi atualizado com sucesso.",
          duration: 3000
        });
        return updatedTemplate;
      }
    } catch (err) {
      console.error('Error updating checklist:', err);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar template",
        description: "Não foi possível atualizar o template de checklist.",
        duration: 3000
      });
      throw err;
    }
  };

  const deleteChecklist = async (id: string) => {
    try {
      const { error } = await deleteChecklistInDb(id);

      if (error) throw error;

      toast({
        title: "Template removido",
        description: "O template de checklist foi removido com sucesso.",
        duration: 3000
      });
    } catch (err) {
      console.error('Error deleting checklist:', err);
      toast({
        variant: "destructive",
        title: "Erro ao remover template",
        description: "Não foi possível remover o template de checklist.",
        duration: 3000
      });
      throw err;
    }
  };

  return {
    templates,
    loading,
    error,
    createChecklist,
    updateChecklist,
    deleteChecklist,
  };
};
