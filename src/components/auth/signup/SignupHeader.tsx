import { motion } from "framer-motion";

export function SignupHeader() {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="https://i.postimg.cc/CKH9jbSX/logolaciaestaaaa.png"
          alt="LaciaVisionLLM Logo"
          className="h-16 mx-auto"
        />
      </motion.div>
      <div className="space-y-2">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#46c68f] via-[#15bcc6] to-[#46c68f] bg-clip-text text-transparent"
        >
          LaciaVisionLLM
        </motion.h2>
        <p className="text-sm text-gray-400">
          Comece sua jornada com o LaciaVisionLLM
        </p>
      </div>
    </div>
  );
}
