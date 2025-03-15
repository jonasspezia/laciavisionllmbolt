import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Send } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";

const contactFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string()
    .min(1, "Email é obrigatório")
    .email("Formato de email inválido. Ex: seu@email.com")
    .refine((email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }, "Formato de email inválido. Ex: seu@email.com"),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormValues) => Promise<void>;
  isLoading: boolean;
}

export function ContactForm({ onSubmit, isLoading }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Nome</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Seu nome" 
                  {...field} 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-primary"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="seu@email.com" 
                  type="email" 
                  {...field} 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-primary"
                  autoComplete="email"
                  aria-describedby="email-error"
                />
              </FormControl>
              <FormMessage 
                className="text-red-400 text-sm mt-1" 
                id="email-error"
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Assunto</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Assunto da mensagem" 
                  {...field} 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-primary"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Mensagem</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Digite sua mensagem..." 
                  className="min-h-[120px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-primary resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-primary-hover hover:opacity-90 transition-opacity h-12"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2 justify-center">
              <LoadingSpinner />
              <span>Enviando mensagem...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              <Send className="w-5 h-5" />
              <span>Enviar Mensagem</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
