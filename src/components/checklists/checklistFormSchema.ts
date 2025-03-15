import * as z from 'zod';
import { ChecklistType } from '@/types/checklist';

export const formSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .nonempty('Nome é obrigatório'),
  items: z.array(z.object({
    description: z.string().min(1, 'Descrição do item é obrigatória'),
  })).min(1, 'Adicione pelo menos um item ao checklist'),
});

export type FormValues = z.infer<typeof formSchema>;

export type ChecklistFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    name?: string;
    items?: Array<{
      description: string;
    }>;
  };
  onSubmit: (data: FormValues) => Promise<void>;
};
