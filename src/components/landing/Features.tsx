import { Video, CheckCircle, Layout } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Avaliação Multimodal",
    description: "Análise avançada de vídeos usando múltiplos modelos de IA para uma avaliação completa e precisa.",
    icon: Video,
  },
  {
    title: "Feedback Automático",
    description: "Geração instantânea de relatórios detalhados e sugestões de melhoria baseadas em critérios padronizados.",
    icon: CheckCircle,
  },
  {
    title: "Dashboard Intuitivo",
    description: "Interface moderna para gerenciar avaliações, acompanhar progresso e visualizar métricas importantes.",
    icon: Layout,
  },
];

const Features = () => {
  return (
    <section 
      className="py-20 relative" 
      id="features"
      role="region"
      aria-label="Recursos principais"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-50">
            Recursos Principais
          </h2>
          <p className="mt-4 text-neutral-200">
            Tecnologia de ponta para avaliações práticas precisas
          </p>
        </div>

        <div 
          className="grid md:grid-cols-3 gap-8"
          role="list"
          aria-label="Lista de recursos"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl backdrop-blur-md bg-neutral-800/50 hover:bg-neutral-800/70 border border-neutral-700/30 transition-all hover:shadow-xl hover:-translate-y-1"
              role="listitem"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-50 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
