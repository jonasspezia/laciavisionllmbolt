import { useState } from 'react';
import { useChecklists } from '@/hooks/useChecklists';
import { ChecklistType } from '@/types/checklist';
import { Button } from '@/components/ui/button';
import { Plus, ListChecks } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ChecklistsListSkeleton } from './ChecklistsListSkeleton';
import { ChecklistCard } from './ChecklistCard';
import { DeleteChecklistDialog } from './DeleteChecklistDialog';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

interface ChecklistsListProps {
  institutionId?: string;
  onCreateNew?: () => void;
  onEdit?: (id: string) => void;
}

export const ChecklistsList = ({
  institutionId,
  onCreateNew,
  onEdit
}: ChecklistsListProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { templates: globalTemplates, loading: loadingGlobal } = useChecklists({ 
    type: 'global', 
    institutionId 
  });
  const { templates: personalTemplates, loading: loadingPersonal, deleteChecklist } = useChecklists({ 
    type: 'personal', 
    institutionId 
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteChecklist(deleteId);
      toast({
        title: 'Checklist excluído',
        description: 'O checklist foi excluído com sucesso.'
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o checklist.',
        variant: 'destructive'
      });
    } finally {
      setDeleteId(null);
    }
  };

  if (loadingGlobal || loadingPersonal) {
    return <ChecklistsListSkeleton />;
  }

  return (
    <section className="container max-w-5xl mx-auto space-y-8 py-8" aria-labelledby="checklists-heading">
      <div className="glass-card p-6 border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="p-3 rounded-xl bg-white/5">
            <ListChecks className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h1 id="checklists-heading" className="text-2xl font-semibold text-white">
              Checklists Avaliativos
            </h1>
            <p className="text-sm text-white/60">
              Gerencie seus checklists de avaliação
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <Button 
              onClick={onCreateNew}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
              size="lg"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
              <span>Novo Checklist</span>
            </Button>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Checklists Globais */}
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Checklists Globais
            </h2>
            <div className="space-y-3">
              {globalTemplates.length === 0 ? (
                <div className="glass-card p-8 text-center border-white/10">
                  <p className="text-white/60">
                    Nenhum checklist global disponível.
                  </p>
                </div>
              ) : (
                globalTemplates.map((template) => (
                  <ChecklistCard
                    key={template.id}
                    template={template}
                    onEdit={undefined}
                    onDelete={undefined}
                  />
                ))
              )}
            </div>
          </motion.div>

          {/* Checklists Personalizados */}
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Meus Checklists
            </h2>
            <div className="space-y-3">
              {personalTemplates.length === 0 ? (
                <div className="glass-card p-8 text-center border-white/10">
                  <p className="text-white/60">
                    Você ainda não criou nenhum checklist personalizado.
                  </p>
                </div>
              ) : (
                personalTemplates.map((template) => (
                  <ChecklistCard
                    key={template.id}
                    template={template}
                    onEdit={onEdit}
                    onDelete={setDeleteId}
                  />
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <DeleteChecklistDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </section>
  );
};
