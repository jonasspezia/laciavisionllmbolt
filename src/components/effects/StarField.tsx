import { motion } from "framer-motion";

export const StarField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => {
        const depth = Math.random();
        const size = depth * 2 + 0.5;
        const speed = (1 - depth) * 15 + 5;
        const zIndex = Math.floor(depth * 20);
        
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            initial={{
              opacity: Math.random() * 0.2 + 0.1,
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: depth,
            }}
            animate={{
              x: [null, `${Math.random() * 100}%`],
              y: [null, `${Math.random() * 100}%`],
              opacity: [0.1, 0.3, 0.1],
              scale: [depth, depth * 1.2, depth],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: Math.random() * -speed,
            }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: depth > 0.6 ? 'rgba(200, 200, 200, 0.3)' : 'rgba(180, 180, 180, 0.3)',
              boxShadow: `0 0 ${size}px ${depth > 0.6 ? 'rgba(200, 200, 200, 0.1)' : 'rgba(180, 180, 180, 0.1)'}`,
              filter: `blur(${(1 - depth) * 0.5}px)`,
              zIndex,
            }}
          />
        );
      })}
    </div>
  );
};
