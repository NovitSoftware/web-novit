'use client';

import { motion } from 'framer-motion';

interface PageLoadingProps {
  isLoading: boolean;
}

export default function PageLoading({ isLoading }: PageLoadingProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        {/* Logo animado */}
        <motion.div
          className="w-16 h-16 bg-gradient-novit-accent rounded-lg flex items-center justify-center mb-4 mx-auto"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-white font-bold text-2xl">N</span>
        </motion.div>

        {/* Texto de carga */}
        <motion.p
          className="text-white/80 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Cargando...
        </motion.p>

        {/* Barra de progreso */}
        <motion.div 
          className="w-48 h-1 bg-slate-700 rounded-full mt-4 mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-novit-accent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
