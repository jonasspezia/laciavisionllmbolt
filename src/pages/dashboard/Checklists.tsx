import { useAuth } from "@/hooks/useAuth";
import { ChecklistsList } from "@/components/checklists/ChecklistsList";
import { useEffect, useState } from "react";
import { Profile } from "@/types/supabase";
import { supabase } from "@/integrations/supabase/client";
import { ChecklistForm } from "@/components/checklists/ChecklistForm";
import { CreateChecklistInput, ChecklistTemplate } from "@/types/checklist";
import { useToast } from "@/components/ui/use-toast";

export default function Checklists() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<ChecklistTemplate | undefined>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        const isValidRole = ['admin', 'institution_admin', 'professor', 'student'].includes(data.role);
        if (isValidRole) {
          setProfile(data as Profile);
        } else {
          console.error('Invalid role type received from database:', data.role);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleCreateOrEdit = async (data: CreateChecklistInput) => {
    if (!user?.id) {
      toast({
        title: "Erro ao salvar",
        description: "Você precisa estar logado para realizar esta ação.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (selectedChecklist) {
        // Editar checklist existente
        const { error } = await supabase
          .from('checklist_templates')
          .update({
            name: data.name,
            description: data.description,
            type: 'personal',
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedChecklist.id);

        if (error) throw error;

        toast({
          title: "Checklist atualizado",
          description: "O checklist foi atualizado com sucesso.",
        });
      } else {
        // Criar novo checklist
        const { error } = await supabase
          .from('checklist_templates')
          .insert([{
            ...data,
            type: 'personal',
            created_by: user.id,
            status: 'active',
            is_global: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (error) throw error;

        toast({
          title: "Checklist criado",
          description: "O novo checklist foi criado com sucesso.",
        });
      }

      setIsFormOpen(false);
      setSelectedChecklist(undefined);
    } catch (error) {
      console.error('Erro ao salvar checklist:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o checklist.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('checklist_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setSelectedChecklist(data as ChecklistTemplate);
      setIsFormOpen(true);
    } catch (error) {
      console.error('Erro ao carregar checklist:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar os dados do checklist.",
        variant: "destructive",
      });
    }
  };

  if (!profile) return null;

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <ChecklistsList
          institutionId={profile?.institution_id}
          onCreateNew={() => {
            setSelectedChecklist(undefined);
            setIsFormOpen(true);
          }}
          onEdit={handleEdit}
        />
        
        <ChecklistForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          initialData={selectedChecklist}
          onSubmit={handleCreateOrEdit}
        />
      </div>
    </main>
  );
}
