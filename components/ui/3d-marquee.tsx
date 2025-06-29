"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SkillItem {
  name: string;
  icon: string;
  category: string;
}

export const ThreeDMarquee = ({
  items,
  className,
}: {
  items: SkillItem[];
  className?: string;
}) => {
  const chunkSize = Math.ceil(items.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return items.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "mx-auto block h-full overflow-hidden",
        className,
      )}
    >
      <div className="flex size-full items-center justify-center perspective-[2000px]">
        <div className="size-[1800px] shrink-0 scale-[0.22] sm:scale-[0.28] md:scale-[0.32] lg:scale-[0.35] xl:scale-[0.4]">
          <div
            style={{
              transform: "rotateX(10deg) rotateZ(-10deg)",
              transformOrigin: "center center",
            }}
            className="relative grid size-full grid-cols-4 gap-6 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                initial={{ y: colIndex % 2 === 0 ? -50 : 50 }}
                animate={{ 
                  y: colIndex % 2 === 0 ? [50, -50] : [-50, 50]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-12"
              >
                {subarray.map((item, itemIndex) => (
                  <motion.div
                    className="relative transform-gpu group"
                    key={itemIndex + item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-md opacity-25 group-hover:opacity-75 transition-all duration-500"></div>
                    <motion.div
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.2)] w-[220px] border border-white/20 dark:border-gray-700/20 transition-shadow duration-500"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-16 h-16 p-2">
                          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-xl blur-[2px]"></div>
                          <div className="absolute inset-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl"></div>
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain relative z-10 drop-shadow-xl"
                          />
                        </div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                          {item.name}
                        </h3>
                        <span className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg">
                          {item.category}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
