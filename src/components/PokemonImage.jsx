import { motion } from "framer-motion";

export default function PokemonImage({ src, revealed }) {
  return (
    <div className="relative">
      <motion.img
        src={src}
        alt="Pokemon silueta"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: revealed ? [1, 1.1, 1] : 1,
          opacity: 1,
          filter: revealed ? "brightness(1)" : "brightness(0)",
        }}
        transition={{ duration: revealed ? 0.8 : 0.5 }}
        className="w-60 h-60 object-contain rounded-xl drop-shadow-xl"
      />
      {revealed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 rounded-xl pointer-events-none bg-white mix-blend-overlay"
        />
      )}
    </div>
  );
}