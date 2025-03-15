import { motion } from "framer-motion";
import { Brain, Clock, Users, PlusCircle } from "lucide-react";

const USP = () => {
  const propositions = [
    {
      icon: Brain,
      title: "IA Multimodal Avançada",
      description: "Nossa tecnologia LaciaVisionLLM analisa todos os aspectos do vídeo: movimentos, técnica, precisão e conformidade com protocolos."
    },
    {
      icon: Clock,
      title: "Avaliação em Tempo Real",
      description: "Resultados instantâneos e feedback detalhado, eliminando longas esperas por avaliações."
    },
    {
      icon: Users,
      title: "Avaliação Padronizada",
      description: "Critérios consistentes e objetivos para todos os alunos, garantindo justiça e equidade."
    },
    {
      icon: PlusCircle,
      title: "Melhoria Contínua",
      description: "Análises detalhadas e sugestões personalizadas para aprimoramento das habilidades."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(70,198,143,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neural-start via-neural-middle to-neural-end bg-clip-text text-transparent">
            Por que Escolher o LaciaVisionLLM?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Transformando a avaliação médica com tecnologia de ponta
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {propositions.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm 
                hover:bg-white/10 transition-all duration-300 h-full
                hover:shadow-[0_0_30px_rgba(70,198,143,0.1)] group-hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg 
                  bg-gradient-to-br from-neural-start/20 to-neural-middle/20 mb-4
                  group-hover:from-neural-start/30 group-hover:to-neural-middle/30"
                >
                  <prop.icon className="w-6 h-6 text-neural-start" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {prop.title}
                </h3>
                
                <p className="text-gray-400">
                  {prop.description}
                </p>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-neural-start/0 via-neural-middle/5 to-neural-end/0 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 blur-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USP;
