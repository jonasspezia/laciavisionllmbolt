import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Olá! Como posso ajudar você hoje?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, { text: newMessage, isUser: true }]);
    setNewMessage("");

    // Simulated response - in a real app, this would connect to your support system
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Obrigado por sua mensagem! Um de nossos atendentes entrará em contato em breve.",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white shadow-lg p-1"
          aria-label="Abrir chat de suporte"
        >
          <img 
            src="https://i.postimg.cc/CKH9jbSX/logolaciaestaaaa.png" 
            alt="LACIA Vision LLM" 
            className="w-full h-full object-contain"
          />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-[350px] bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200"
          >
            {/* Header */}
            <div className="bg-neutral-800 p-4 text-white flex justify-between items-center">
              <h3 className="font-semibold">Suporte ao Cliente</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-neutral-700"
                aria-label="Fechar chat"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-neutral-800 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 min-h-[44px] px-3 py-2 bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  aria-label="Digite sua mensagem"
                />
                <Button 
                  type="submit"
                  className="min-w-[44px] min-h-[44px] bg-neutral-800 hover:bg-neutral-700"
                  disabled={!newMessage.trim()}
                >
                  Enviar
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
