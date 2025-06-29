"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProgressCircleProps {
  percentage: number;
  name: string;
  icon: string;
  color: string;
  isVisible: boolean;
}

export const ProgressCircle = ({ percentage, name, icon, color, isVisible }: ProgressCircleProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="relative flex items-center justify-between bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-6 flex-1">
            <div className="relative min-w-[120px]">
              <svg width="120" height="120" className="transform -rotate-90">
                {/* Outer decorative circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius + 5}
                  stroke={color}
                  strokeWidth="1"
                  fill="none"
                  strokeOpacity="0.2"
                />
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke={color}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="drop-shadow-lg"
                />
                {/* Percentage text */}
                <motion.text
                  x="60"
                  y="60"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-2xl font-bold fill-gray-800 dark:fill-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {percentage}%
                </motion.text>
              </svg>
              
              {/* Icon */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Image src={icon} alt={name} width={32} height={32} className="w-8 h-8 object-contain" />
              </motion.div>
            </div>

            <div className="flex-1">
              <motion.h3 
                className="text-xl font-bold text-gray-800 dark:text-white mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {name}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full shadow-lg"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 