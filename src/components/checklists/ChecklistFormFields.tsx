import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormValues } from './checklistFormSchema';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChecklistFormFieldsProps {
  form: UseFormReturn<FormValues>;
  onCancel: () => void;
}

export const ChecklistFormFields = ({ form, onCancel }: ChecklistFormFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  });

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white font-medium">
              Nome do Checklist <span className="text-red-400">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                placeholder="Digite o nome do checklist" 
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                aria-required="true"
              />
            </FormControl>
            <FormMessage className="text-red-400 text-sm" />
          </FormItem>
        )}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <FormLabel className="text-white font-medium mb-0">
            Itens Avaliativos <span className="text-red-400">*</span>
          </FormLabel>
          <Button
            type="button"
            onClick={() => append({ description: '' })}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </div>

        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-3 items-center bg-gray-800/50 border border-gray-700 rounded-lg p-3"
              >
                <span className="text-sm font-medium text-gray-400 w-6">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="m-0">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Item ${index + 1}`}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-gray-400 hover:text-red-400 hover:bg-gray-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {fields.length === 0 && (
              <p className="text-center text-gray-400 py-4">
                Nenhum item adicionado. Clique em "Adicionar Item" para começar.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          aria-label="Cancelar"
        >
          <X className="mr-2 h-4 w-4" />
          Cancelar
        </Button>
        <Button 
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white"
          aria-label="Salvar checklist"
        >
          <Save className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
