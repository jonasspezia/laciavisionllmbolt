import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona nossa tecnologia LaciaVisionLLM?",
      answer: "Nossa tecnologia revolucionária combina visão computacional avançada com modelos de linguagem de última geração. Imagine um observador especialista que analisa cada detalhe do procedimento médico em vídeo, identificando movimentos precisos, técnicas corretas e pontos de melhoria. Mais do que uma simples ferramenta de avaliação, é um assistente inteligente que fornece feedback detalhado e construtivo, contribuindo diretamente para o aperfeiçoamento das habilidades práticas dos estudantes."
    },
    {
      question: "Como isso potencializa a pesquisa e inovação na instituição?",
      answer: "Nossa plataforma não apenas avalia, mas gera dados valiosos para pesquisa em educação médica. Este diferencial permite que sua instituição capte recursos para inovação, publique artigos científicos relevantes e se destaque como referência em metodologias avançadas de ensino médico."
    },
    {
      question: "De que forma otimizamos o tempo dos professores?",
      answer: "Ao automatizar as avaliações práticas, liberamos seus professores para o que realmente importa: mentorar alunos. É uma transformação na dinâmica educacional, onde o tempo antes gasto em avaliações agora é dedicado ao desenvolvimento individual de cada estudante."
    },
    {
      question: "Como isso elevará o padrão de ensino da nossa instituição?",
      answer: "Imagine oferecer um padrão de excelência consistente em todas as avaliações práticas. Nossa tecnologia não apenas moderniza o processo avaliativo, mas eleva o prestígio da sua instituição, garantindo que cada aluno seja avaliado com a mesma precisão e rigor que definem uma escola médica de elite."
    },
    {
      question: "Como isso impacta a acreditação e reconhecimento do curso?",
      answer: "Ao implementar avaliações práticas padronizadas e mensuráveis, sua instituição demonstra compromisso com a excelência educacional. É uma evidência tangível de inovação e qualidade que fortalece processos de acreditação e destaca sua escola médica no cenário educacional."
    },
    {
      question: "Como garantimos a segurança dos dados acadêmicos?",
      answer: "Tratamos os dados da sua instituição com o mesmo rigor que vocês tratam a formação médica. Nossa infraestrutura atende aos mais elevados padrões de segurança digital, garantindo total conformidade com regulamentações educacionais e de proteção de dados."
    },
    {
      question: "De que forma a plataforma se adequa ao nosso projeto pedagógico?",
      answer: "Assim como cada escola médica tem sua própria filosofia de ensino, nossa plataforma se adapta ao seu projeto pedagógico específico. É uma solução que respeita e potencializa sua metodologia, permitindo customização completa dos critérios de avaliação."
    },
    {
      question: "Como iniciar a transformação em nossa instituição?",
      answer: "O processo é simples e estruturado. Nossa equipe trabalha diretamente com sua coordenação acadêmica para desenvolver um plano de implementação personalizado. Entre em contato para uma demonstração exclusiva para instituições de ensino médico."
    }
  ];

  return (
    <section className="py-16 glass-panel" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient-primary glow-primary mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-400">
            Descubra como podemos transformar a avaliação prática em sua escola médica
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-white/10"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
