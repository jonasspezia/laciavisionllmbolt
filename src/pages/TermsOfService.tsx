import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  ShieldCheck, 
  UserCircle2, 
  CreditCard,
  Scale,
  BadgeAlert,
  MessageSquare
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ContactDialog } from "@/components/shared/ContactDialog";

const TermsOfService = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#002046] to-[#1a365d]">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-white">Termos de Serviço</h1>
          </div>

          <div className="glass-panel p-6 mb-8">
            <p className="text-gray-300 mb-6">
              Por favor, leia atentamente nossos termos de serviço. Estes termos estabelecem as regras 
              e condições para o uso de nossa plataforma.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <UserCircle2 className="w-5 h-5" />
                    <span>Conta e Registro</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Você deve ter pelo menos 18 anos para criar uma conta</li>
                    <li>As informações fornecidas durante o registro devem ser precisas e completas</li>
                    <li>Você é responsável por manter a segurança de sua conta</li>
                    <li>Não é permitido compartilhar credenciais de acesso</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Privacidade e Segurança</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p className="mb-4">
                    Levamos sua privacidade muito a sério. Nosso compromisso é proteger seus dados pessoais
                    e garantir uma experiência segura em nossa plataforma.
                  </p>
                  <button 
                    onClick={() => handleNavigation('/privacy-policy')}
                    className="text-primary hover:underline"
                  >
                    Leia nossa Política de Privacidade
                  </button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Pagamentos e Reembolsos</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Aceitamos principais cartões de crédito e métodos de pagamento online</li>
                    <li>Os preços são em Reais (BRL) e incluem impostos aplicáveis</li>
                    <li>Reembolsos podem ser solicitados em até 7 dias após a compra</li>
                    <li>O processamento de reembolsos pode levar até 10 dias úteis</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    <span>Direitos e Responsabilidades</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Você é responsável por todo o conteúdo que publica</li>
                    <li>Não é permitido violar direitos autorais ou propriedade intelectual</li>
                    <li>Reservamos o direito de suspender contas que violem nossos termos</li>
                    <li>Você concorda em não usar a plataforma para atividades ilegais</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <BadgeAlert className="w-5 h-5" />
                    <span>Limitação de Responsabilidade</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>
                    Nossa plataforma é fornecida "como está". Não nos responsabilizamos por perdas
                    ou danos indiretos resultantes do uso do serviço. Faremos o possível para manter
                    o serviço disponível, mas não garantimos disponibilidade ininterrupta.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Comunicações</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p className="mb-4">
                    Ao criar uma conta, você concorda em receber comunicações importantes sobre:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Atualizações do serviço</li>
                    <li>Alterações nos termos</li>
                    <li>Informações de segurança</li>
                    <li>Suporte ao cliente</li>
                  </ul>
                  <div className="mt-4">
                    <ContactDialog />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
