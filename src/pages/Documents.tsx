import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Scroll, 
  Upload, 
  Brain, 
  MessageSquare,
  Settings,
  Shield,
  Info
} from "lucide-react";
import { ContactDialog } from "@/components/shared/ContactDialog";

const Documents = () => {
  useEffect(() => {
    // Garante que a página carregue no topo
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#002046] to-[#1a365d]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Scroll className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-white">Documentação</h1>
          </div>

          <div className="glass-panel p-6 mb-8">
            <p className="text-gray-300 mb-6">
              Bem-vindo à documentação do sistema de avaliação prática. Esta plataforma foi desenvolvida para otimizar o processo de avaliação em vídeo, oferecendo ferramentas intuitivas e recursos avançados.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    <span>Introdução</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p className="leading-relaxed">
                    Nossa plataforma oferece uma solução completa para avaliação prática através de análise de vídeos, combinando tecnologia avançada com uma interface intuitiva para proporcionar a melhor experiência possível.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload de Vídeos</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Suporte a múltiplos formatos de vídeo</li>
                    <li>Upload seguro e criptografado</li>
                    <li>Armazenamento em nuvem confiável</li>
                    <li>Gerenciamento simples de arquivos</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    <span>Análise Inteligente</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p className="mb-4">
                    Nossa plataforma utiliza tecnologia avançada para analisar os vídeos, identificando:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Padrões de movimento</li>
                    <li>Precisão técnica</li>
                    <li>Conformidade com protocolos</li>
                    <li>Métricas de desempenho</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Feedback Detalhado</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Relatórios personalizados</li>
                    <li>Métricas detalhadas de desempenho</li>
                    <li>Sugestões de melhoria</li>
                    <li>Histórico de progresso</li>
                    <li>Compartilhamento de resultados</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    <span>Recursos Técnicos</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Interface responsiva e intuitiva</li>
                    <li>Compatibilidade com diversos dispositivos</li>
                    <li>Sistema de backup automático</li>
                    <li>Integração com outras ferramentas</li>
                    <li>API robusta para desenvolvedores</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Segurança e Suporte</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p className="mb-4">
                    Priorizamos a segurança dos seus dados e oferecemos suporte abrangente:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Criptografia de ponta a ponta</li>
                    <li>Backup regular dos dados</li>
                    <li>Suporte técnico 24/7</li>
                    <li>Documentação detalhada</li>
                    <li>Treinamento e workshops</li>
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

export default Documents;
