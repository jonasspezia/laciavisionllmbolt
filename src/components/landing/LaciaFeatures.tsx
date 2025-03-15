import { Brain, School, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

const LaciaFeatures = () => {
  const features = [
    {
      icon: School,
      title: "Para Instituições de Ensino",
      benefits: [
        "Avaliações práticas padronizadas e mensuráveis",
        "Fortalecimento do processo de acreditação",
        "Geração de dados para pesquisa e inovação",
        "Diferencial competitivo no mercado educacional",
        "Otimização de recursos e infraestrutura"
      ]
    },
    {
      icon: Users,
      title: "Para Professores",
      benefits: [
        "Mais tempo para mentorar alunos",
        "Avaliações automáticas e precisas",
        "Dados detalhados sobre o desempenho dos alunos",
        "Suporte à decisão pedagógica",
        "Foco no desenvolvimento individual"
      ]
    },
    {
      icon: GraduationCap,
      title: "Para Alunos",
      benefits: [
        "Feedback imediato e personalizado",
        "Identificação precisa de pontos de melhoria",
        "Acompanhamento consistente da evolução",
        "Prática orientada por dados",
        "Desenvolvimento acelerado de habilidades"
      ]
    }
  ];

  return (
    <section className="py-16 relative" id="lacia-features">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-12 h-12 text-primary mr-3" />
            <h2 className="text-4xl font-bold text-gradient-primary glow-primary">
              LaciaVisionLLM
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Nossa tecnologia revolucionária combina visão computacional avançada com modelos de linguagem 
            para transformar a avaliação prática no ensino médico
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-panel p-6 rounded-xl transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
                    className="text-gray-400 flex items-start"
                  >
                    <span className="text-primary mr-2">•</span>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaciaFeatures;
