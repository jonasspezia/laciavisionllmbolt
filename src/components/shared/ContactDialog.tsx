import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, Mail } from "lucide-react";
import { ContactForm, type ContactFormValues } from "./contact/ContactForm";
import { useIsMobile } from "@/hooks/use-mobile";

export function ContactDialog() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

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
        description: "Agradecemos seu contato. Retornaremos em breve."
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-gray-200 hover:text-neural-start transition-colors duration-300">
          <Mail className="w-4 h-4 mr-2" />
          Entre em Contato
        </Button>
      </DialogTrigger>
      <DialogContent className={`
        fixed
        left-[50%]
        top-[50%]
        -translate-x-1/2
        -translate-y-1/2
        w-[calc(100%-2rem)]
        sm:max-w-[500px] 
        bg-gradient-to-br from-gray-800 to-gray-900 
        border border-gray-700 
        relative
        max-h-[90vh]
        overflow-y-auto
        ${isMobile ? 'p-4 mx-3' : 'p-6 pb-12'}
      `}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 bg-gray-700 hover:bg-gray-600 transition-colors rounded-full p-2 text-white"
          aria-label="Fechar diálogo"
        >
          <X className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} />
        </button>
        <DialogHeader className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            Envie sua mensagem
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2 text-base">
            Preencha o formulário abaixo e entraremos em contato o mais breve possível.
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSubmit={onSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>;
}
