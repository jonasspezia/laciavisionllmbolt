import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export function TermsDialog({ open, onOpenChange, onAccept }: TermsDialogProps) {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [privacyAccepted, setPrivacyAccepted] = React.useState(false);

  const handleAccept = () => {
    if (termsAccepted && privacyAccepted) {
      onAccept();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Termos de Serviço e Política de Privacidade</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] mt-4">
          <div className="space-y-6 px-2">
            <div>
              <h3 className="text-lg font-semibold mb-2">Termos de Serviço</h3>
              <div className="text-sm text-muted-foreground">
                Estes Termos de Serviço regem o uso do LaciaVisionLLM. Ao acessar ou usar nossos serviços, você concorda com estes termos. Se você não concordar com todos os termos e condições, não poderá acessar ou usar os serviços.
                <br /><br />
                1. **Uso do Serviço:** O LaciaVisionLLM é fornecido para seu uso pessoal e não comercial. Você concorda em não usar o serviço para fins ilegais ou não autorizados.
                <br /><br />
                2. **Conteúdo do Usuário:** Você é responsável pelo conteúdo que envia ou compartilha através do LaciaVisionLLM. Não permitimos conteúdo que seja ilegal, ofensivo, difamatório, ou que viole os direitos de terceiros.
                <br /><br />
                3. **Privacidade:** Respeitamos sua privacidade. Nossa Política de Privacidade explica como coletamos, usamos e protegemos suas informações.
                <br /><br />
                4. **Alterações no Serviço:** Podemos modificar ou descontinuar o LaciaVisionLLM, ou qualquer parte dele, a qualquer momento.
                <br /><br />
                5. **Rescisão:** Podemos rescindir seu acesso ao LaciaVisionLLM se você violar estes Termos de Serviço.
                <br /><br />
                6. **Isenção de Responsabilidade:** O LaciaVisionLLM é fornecido "como está", sem garantias de qualquer tipo. Não somos responsáveis por quaisquer danos resultantes do uso do serviço.
                <br /><br />
                7. **Lei Aplicável:** Estes Termos de Serviço são regidos pelas leis do Brasil.
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Política de Privacidade</h3>
              <div className="text-sm text-muted-foreground">
                Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais quando você usa o LaciaVisionLLM.
                <br /><br />
                1. **Informações Coletadas:** Coletamos informações que você nos fornece diretamente, como seu nome, endereço de e-mail e outras informações de contato. Também coletamos informações automaticamente, como seu endereço IP, tipo de navegador e dados de uso.
                <br /><br />
                2. **Uso das Informações:** Usamos suas informações para fornecer, manter e melhorar o LaciaVisionLLM, para nos comunicarmos com você e para personalizar sua experiência.
                <br /><br />
                3. **Compartilhamento de Informações:** Não compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para fornecer o serviço (por exemplo, provedores de hospedagem) ou conforme exigido por lei.
                <br /><br />
                4. **Segurança:** Tomamos medidas razoáveis para proteger suas informações pessoais contra acesso não autorizado e uso indevido.
                <br /><br />
                5. **Seus Direitos:** Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Entre em contato conosco se desejar exercer esses direitos.
                <br /><br />
                6. **Alterações na Política:** Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações significativas.
                <br /><br />
                7. **Contato:** Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco.
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              Li e aceito os Termos de Serviço
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="privacy"
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
            />
            <Label htmlFor="privacy" className="text-sm">
              Li e aceito a Política de Privacidade
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleAccept}
            disabled={!termsAccepted || !privacyAccepted}
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
