import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/supabase";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/ui/loading";
import { useStats } from "@/hooks/useStats";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";

export default function DashboardIndex() {
  const { user, isConnected } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.id) return;
        
        // Se não há conexão, cria um perfil mock para UI
        if (!isConnected) {
          const mockProfile: Profile = {
            id: user.id,
            full_name: user.email?.split('@')[0] || 'Usuário',
            email: user.email || '',
            institution_id: null,
            role: 'professor',
            specialty: null,
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          
          setProfile(mockProfile);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select(`
            *,
            institution:institutions (
              id,
              name
            )
          `)
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data && (
          data.role === 'admin' ||
          data.role === 'institution_admin' ||
          data.role === 'professor' ||
          data.role === 'student'
        )) {
          setProfile(data as Profile);
        } else {
          throw new Error('Invalid role type received from database');
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error.message);
        
        if (isConnected) {
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Não foi possível carregar seu perfil.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast, isConnected]);

  const stats = useStats(profile);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading size={32} className="text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ConnectionStatus />
      
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
        {profile?.institution && (
          <p className="text-gray-300">
            {profile.institution.name}
          </p>
        )}
      </header>
      
      <DashboardCards profile={profile} stats={stats} />
    </div>
  );
}
