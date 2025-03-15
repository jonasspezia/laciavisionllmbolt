import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChecklistItem } from '@/types/checklist';
import { useToast } from '@/components/ui/use-toast';
import { ChecklistItemFormData } from '@/components/checklists/checklistItemSchema';

export const useChecklistItems = (templateId: string) => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadItems = async () => {
    try {
      const { data, error } = await supabase
        .from('checklist_items')
        .select('*')
        .eq('template_id', templateId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      console.error('Error loading items:', error.message);
      toast({
        title: 'Erro ao carregar itens',
        description: 'Não foi possível carregar os itens do checklist.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (formData: ChecklistItemFormData) => {
    try {
      const newOrderIndex = items.length + 1;
      const { data, error } = await supabase
        .from('checklist_items')
        .insert([{
          template_id: templateId,
          description: formData.description,
          required: formData.required,
          weight: formData.weight,
          order_index: newOrderIndex,
        }])
        .select()
        .single();

      if (error) throw error;
      setItems(prev => [...prev, data]);
      
      toast({
        title: 'Item adicionado',
        description: 'O item foi adicionado com sucesso ao checklist.'
      });
    } catch (error: any) {
      console.error('Error adding item:', error.message);
      toast({
        title: 'Erro ao adicionar item',
        description: 'Não foi possível adicionar o item ao checklist.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateItemsOrder = async (reorderedItems: ChecklistItem[]) => {
    try {
      // Atualizar cada item individualmente com o método update
      for (const [index, item] of reorderedItems.entries()) {
        const { error } = await supabase
          .from('checklist_items')
          .update({ order_index: index + 1 })
          .eq('id', item.id);

        if (error) throw error;
      }

      setItems(reorderedItems);
      
      toast({
        title: 'Ordem atualizada',
        description: 'A ordem dos itens foi atualizada com sucesso.'
      });
    } catch (error: any) {
      console.error('Error updating order:', error.message);
      toast({
        title: 'Erro ao reordenar',
        description: 'Não foi possível atualizar a ordem dos itens.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('checklist_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      setItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: 'Item removido',
        description: 'O item foi removido com sucesso do checklist.'
      });
    } catch (error: any) {
      console.error('Error deleting item:', error.message);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o item do checklist.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    if (templateId) {
      loadItems();
    }
  }, [templateId]);

  return {
    items,
    loading,
    addItem,
    updateItemsOrder,
    deleteItem,
    loadItems,
  };
};
