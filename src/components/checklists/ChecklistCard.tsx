import { ChecklistTemplate } from '@/types/checklist';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Trash2, FileText, Globe, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

interface ChecklistCardProps {
  template: ChecklistTemplate;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ChecklistCard = ({
  template,
  onEdit,
  onDelete
}: ChecklistCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  return (
    <>
      <div className="group flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-primary/50 transition-all duration-300">
        <div className="flex items-center gap-3 flex-1">
          <div>
            <h3 className="text-sm font-medium text-white group-hover:text-primary transition-colors">
              {template.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <FileText className="h-3 w-3" aria-hidden="true" />
              {template.items?.length || 0} itens
              {template.is_global && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs py-0 px-1">
                  <Globe className="w-3 h-3 mr-1" />
                  Global
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDetailsOpen(true)}
            className="text-gray-400 hover:text-primary hover:bg-gray-800"
            aria-label={`Ver detalhes do checklist ${template.name}`}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
          </Button>
          {template.is_global !== true && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(template.id)}
                className="text-gray-400 hover:text-primary hover:bg-gray-800"
                aria-label={`Editar checklist ${template.name}`}
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(template.id)}
                className="text-gray-400 hover:text-red-400 hover:bg-gray-800"
                aria-label={`Excluir checklist ${template.name}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            </>
          )}
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto p-8">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              {template.name}
              {template.is_global && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                  <Globe className="w-3 h-3 mr-1" />
                  Global
                </Badge>
              )}
            </DialogTitle>
            <p className="text-gray-400 text-base font-normal">{template.description || 'Sem descrição'}</p>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Itens do checklist:</h3>
              {template.items && template.items.length > 0 ? (
                <ul className="space-y-3 list-none pl-0">
                  {template.items.map((item, index) => (
                    <li 
                      key={item.id} 
                      className="flex gap-3 p-4 rounded-lg bg-gray-700/50"
                    >
                      <span className="font-medium text-primary min-w-[24px]">{index + 1}.</span>
                      <span className="text-gray-200">{item.description}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">Nenhum item cadastrado.</p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Criado em {new Date(template.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
