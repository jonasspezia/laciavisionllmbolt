import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { ChecklistFormFields } from './ChecklistFormFields';
import { ChecklistFormProps, formSchema, FormValues } from './checklistFormSchema';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const ChecklistForm = ({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: ChecklistFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      items: initialData?.items || []
    }
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: initialData?.name || '',
        items: initialData?.items || []
      });
    }
  }, [open, initialData, form]);

  const handleSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Erro ao salvar",
        description: "Você precisa estar logado para criar um checklist.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Primeiro, criar o template
      const { data: template, error: templateError } = await supabase
        .from('checklist_templates')
        .insert([{
          name: values.name,
          type: 'personal',
          created_by: user.id,
          status: 'active',
          is_global: false
        }])
        .select()
        .single();

      if (templateError) throw templateError;

      // Depois, adicionar os itens
      const items = values.items.map((item, index) => ({
        template_id: template.id,
        description: item.description,
        order_index: index,
        required: true, // valor padrão
        weight: 1 // valor padrão
      }));

      const { error: itemsError } = await supabase
        .from('checklist_items')
        .insert(items);

      if (itemsError) throw itemsError;

      onOpenChange(false);
      form.reset();
      toast({
        title: 'Checklist salvo',
        description: 'O checklist foi salvo com sucesso.'
      });
    } catch (error) {
      console.error('Erro ao salvar checklist:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar o checklist.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800 border border-gray-700 p-0">
        <DialogHeader className="p-6 bg-gray-800/50 border-b border-gray-700">
          <DialogTitle className="text-xl font-semibold text-white">
            {initialData ? 'Editar Checklist' : 'Novo Checklist'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)} 
            className="space-y-6 p-6"
            aria-label={initialData ? 'Formulário de edição de checklist' : 'Formulário de criação de checklist'}
          >
            <ChecklistFormFields
              form={form}
              onCancel={() => onOpenChange(false)}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
