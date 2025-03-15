import { motion } from "framer-motion";
import { StarField } from "./workflow/StarField";
import { WorkflowStep } from "./workflow/WorkflowStep";
import { workflowSteps } from "./workflow/workflowData";

const LaciaWorkflow = () => {
  return (
    <section className="py-24 relative overflow-hidden min-h-screen bg-[#111111]" id="lacia-workflow">
      <StarField />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#46c68f]/80 via-[#15bcc6]/80 to-[#46c68f]/80 bg-clip-text text-transparent">
            Fluxo de Análise Neural
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Nossa tecnologia evolui constantemente para oferecer a melhor experiência em avaliação médica
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-32 relative z-10">
          {workflowSteps.map((step, index) => (
            <WorkflowStep key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaciaWorkflow;
