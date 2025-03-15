import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Shield, 
  Lock, 
  User, 
  Cookie, 
  Trash, 
  Eye, 
  Settings,
  Info,
  Mail,
  Send
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ContactDialog } from "@/components/shared/ContactDialog";

const contactFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string()
    .min(1, "Email é obrigatório")
    .email("Formato de email inválido. Ex: seu@email.com")
    .refine((email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }, "Formato de email inválido. Ex: seu@email.com"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const PrivacyPolicy = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem');
      }

      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Retornaremos em breve.",
      });
      
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#002046] to-[#1a365d]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-white">Política de Privacidade</h1>
          </div>

          <div className="glass-panel p-6">
            <p className="text-gray-300 mb-6">
              Esta política de privacidade descreve como coletamos, usamos e protegemos suas informações
              quando você utiliza nossa plataforma. Nos comprometemos com a transparência e a proteção
              dos seus dados pessoais.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>Dados Pessoais</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p className="mb-4">Coletamos apenas os dados necessários para fornecer nossos serviços:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Nome e endereço de e-mail para sua conta</li>
                    <li>Informações de uso do serviço</li>
                    <li>Dados técnicos como endereço IP e cookies</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    <span>Segurança dos Dados</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>
                    Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados
                    contra acesso não autorizado, alteração, divulgação ou destruição não autorizada.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-5 h-5" />
                    <span>Cookies e Tecnologias Similares</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>
                    Utilizamos cookies e tecnologias similares para melhorar sua experiência em nossa plataforma.
                    Os cookies nos ajudam a entender como você interage com nosso site, lembrar suas preferências
                    e fornecer funcionalidades personalizadas. Você pode gerenciar suas preferências de cookies 
                    através das configurações do seu navegador.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    <span>Seus Direitos</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <Eye className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Direito de acessar seus dados pessoais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Settings className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Direito de retificar seus dados pessoais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Trash className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Direito de solicitar a exclusão de seus dados</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    <span>Contato</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p className="mb-4">
                    Para questões relacionadas à privacidade ou exercício de seus direitos, entre em contato conosco:
                  </p>
                  <ContactDialog />
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

export default PrivacyPolicy;
