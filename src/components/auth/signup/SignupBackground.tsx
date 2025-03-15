import { motion, useTransform } from "framer-motion";

interface SignupBackgroundProps {
  backgroundY: any;
}

export function SignupBackground({ backgroundY }: SignupBackgroundProps) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ y: backgroundY }}
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-gradient-radial from-primary/5 to-transparent opacity-30 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-gradient-radial from-secondary/5 to-transparent opacity-30 blur-3xl" />
      </div>
    </motion.div>
  );
}
