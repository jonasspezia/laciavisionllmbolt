import { motion } from "framer-motion";

export const StarField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Enhanced 3D Starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => {
          const depth = Math.random();
          const size = depth * 3 + 0.5;
          const speed = (1 - depth) * 15 + 5;
          const zIndex = Math.floor(depth * 20);
          
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              initial={{
                opacity: Math.random() * 0.3 + 0.2,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                z: depth * 100,
                scale: depth,
              }}
              animate={{
                x: [null, `${Math.random() * 100}%`],
                y: [null, `${Math.random() * 100}%`],
                z: [depth * 100, depth * 200, depth * 100],
                opacity: [0.2, 0.5, 0.2],
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
                background: depth > 0.6 ? 'rgba(70, 198, 143, 0.5)' : 'rgba(21, 188, 198, 0.5)',
                boxShadow: `0 0 ${size}px ${depth > 0.6 ? 'rgba(70, 198, 143, 0.2)' : 'rgba(21, 188, 198, 0.2)'}`,
                filter: `blur(${(1 - depth) * 0.5}px)`,
                transform: `translateZ(${depth * 100}px)`,
                zIndex,
              }}
            />
          );
        })}
      </div>

      {/* Subtle Nebula Effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(70, 198, 143, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 60%, rgba(21, 188, 198, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(70, 198, 143, 0.08) 0%, transparent 50%)'
          ],
          scale: [1, 1.05, 1],
          z: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
    </div>
  );
};
