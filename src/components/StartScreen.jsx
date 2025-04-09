import { motion } from "framer-motion";
import { PlayIcon } from "lucide-react";

export default function StartScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full animate-gradient bg-gradient-to-b from-black via-black to-red-900 bg-[length:200%_200%] flex flex-col items-center justify-center text-center space-y-8 px-4"
    >
      <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-[0_4px_6px_rgba(255,255,255,0.8)]">
        ¿Quién es este Pokémon?
      </h1>
      <p className="text-lg md:text-xl text-white/80 max-w-md">
        ¡Adivina el nombre del Pokémon!
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl shadow-lg text-lg md:text-xl transition-all flex items-center gap-2"
      >
        <PlayIcon className="w-6 h-6 animate-pulse" />
        Inicio
      </motion.button>
    </motion.div>
  );
}