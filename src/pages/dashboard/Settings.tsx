import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Settings as SettingsType } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      console.log("Buscando configurações...");
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('key');

      if (error) {
        console.error('Erro ao buscar configurações:', error);
        throw error;
      }

      console.log("Configurações carregadas:", data);
      setSettings(data || []);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar as configurações."
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    console.log(`Atualizando configuração ${key} com valor ${value}`);
    setSaving(true);
    
    try {
      // Primeiro, verifica se a configuração existe
      const { data: existingSettings, error: checkError } = await supabase
        .from('settings')
        .select('*')
        .eq('key', key)
        .maybeSingle();

      if (checkError) {
        console.error('Erro ao verificar configuração:', checkError);
        throw checkError;
      }

      let updateResult;
      
      if (existingSettings) {
        // Atualiza configuração existente
        updateResult = await supabase
          .from('settings')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('key', key);
      } else {
        // Insere nova configuração
        updateResult = await supabase
          .from('settings')
          .insert([{ key, value }]);
      }

      if (updateResult.error) {
        console.error('Erro na operação de update/insert:', updateResult.error);
        throw updateResult.error;
      }

      console.log('Configuração atualizada com sucesso');
      
      // Atualiza o estado local
      setSettings(settings.map(s => 
        s.key === key ? { ...s, value, updated_at: new Date().toISOString() } : s
      ));

      toast({
        title: "Sucesso",
        description: "Configuração atualizada com sucesso."
      });

    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar a configuração. Tente novamente."
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size={32} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Configurações</h1>
      <div className="grid gap-6">
        {settings.map((setting) => (
          <Card key={setting.key}>
            <CardHeader>
              <CardTitle>{setting.key}</CardTitle>
              <CardDescription>
                Configure o valor para {setting.key}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Input
                type="text"
                value={setting.value}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setSettings(settings.map(s => 
                    s.key === setting.key ? { ...s, value: newValue } : s
                  ));
                }}
                className="flex-1"
              />
              <Button 
                onClick={() => updateSetting(setting.key, setting.value)}
                disabled={saving}
              >
                {saving ? <Loading size={16} /> : "Salvar"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
