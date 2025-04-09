import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StartScreen from "./components/StartScreen";
import ScoreBoard from "./components/ScoreBoard";
import PokemonImage from "./components/PokemonImage";
import "@fontsource/press-start-2p";

const getRandomPokemonId = () => Math.floor(Math.random() * 151) + 1;

export default function App() {
  const [appState, setAppState] = useState("loading");
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [hasGuessed, setHasGuessed] = useState(false);

  useEffect(() => {
    setTimeout(() => setAppState("start"), 2000);
  }, []);

  const playSound = (type) => {
    const sound = new Audio(`/sounds/${type}.mp3`);
    sound.play();
  };

  const fetchPokemon = async () => {
    const id = getRandomPokemonId();

    const [res1, res2] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const data = await res1.json();
    const species = await res2.json();

    const nameES =
      species.names.find((n) => n.language.name === "es")?.name || data.name;

    setPokemon({
      id,
      name: data.name,
      nameES,
      image: data.sprites.other["official-artwork"].front_default,
    });

    setGuess("");
    setRevealed(false);
    setFeedback("");
    setAttempts(0);
    setHasGuessed(false);
  };

  useEffect(() => {
    if (appState === "playing") fetchPokemon();
  }, [appState]);

  const handleGuess = () => {
    if (!pokemon) return;
    setAttempts((prev) => prev + 1);
    setHasGuessed(true);

    const userInput = guess.trim().toLowerCase();
    const realName = pokemon.name.toLowerCase();
    const realNameES = pokemon.nameES.toLowerCase();

    const isCorrect = userInput === realName || userInput === realNameES;

    const entry = {
      result: isCorrect ? "✅ Correcto" : "❌ Incorrecto",
      name: isCorrect ? pokemon.nameES: null,
    };

    setHistory((prev) => [entry, ...prev]);

    if (isCorrect) {
      setFeedback(`✅ ¡Correcto! Es ${pokemon.nameES}`);
      setRevealed(true);
      setScore((prev) => prev + 1);
      playSound("correct");
    } else {
      setFeedback("❌ Incorrecto. Intenta de nuevo.");
      playSound("wrong");
    }
  };

  const startGame = () => setAppState("playing");

  return (
    <div className="min-h-screen bg-black font-[\'Press Start 2P\'] text-white flex flex-col items-center justify-center p-6 space-y-6">
      {appState === "loading" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center gap-4 animate-pulse"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ yoyo: Infinity, duration: 1 }}
            className="text-3xl text-center"
          >
            ⚡ Cargando Pokédex
          </motion.div>
          <div className="w-12 h-12 border-4 border-t-red-500 border-white rounded-full animate-spin"></div>
        </motion.div>
      )}

      {appState === "start" && <StartScreen onStart={startGame} />}

      {appState === "playing" && (
        <div className="w-full flex flex-col items-center gap-6">

            <h1 className="text-5xl text-center font-bold drop-shadow-[0_3px_3px_rgba(255,255,255,0.8)]">
              ¿Quién es este Pokémon?
            </h1>

            <ScoreBoard score={score} attempts={attempts} />

            {pokemon && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="transition-transform duration-300 bg-gradient-to-b from-black to-red-900 p-4 rounded-xl"
              >
                <div className="bg-red-700 rounded-lg p-4">
                  <PokemonImage src={pokemon.image} revealed={revealed} />
                </div>
              </motion.div>
            )}

            <div className="w-full max-w-sm flex flex-col gap-4 items-center">
              <input
                type="text"
                placeholder="Escribe el nombre..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={handleGuess}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
              >
                ¡Adivinar!
              </button>
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.p
                  key={feedback}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-semibold text-center"
                >
                  {feedback}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={fetchPokemon}
              disabled={!hasGuessed}
              className={`mt-6 px-4 py-2 rounded-lg transition-all ${
                hasGuessed
                  ? "bg-gray-200 hover:bg-gray-300 text-black"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              Nuevo Pokémon
            </button>

            {history.length > 0 && (
              <div className="mt-6 w-full max-w-sm bg-white text-black rounded-lg p-4 shadow-inner text-center">
                <h2 className="text-sm font-bold mb-2">Historial</h2>
                <ul className="space-y-1 text-xs max-h-48 overflow-y-auto">
                  {history.map((entry, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{entry.result}</span>
                      <span className="font-bold">{entry.name ? entry.name : ""}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
    </div>
  )}
</div>
)}