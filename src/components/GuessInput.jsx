export default function GuessInput({ guess, setGuess, onGuess }) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4 items-center">
      <input
        type="text"
        placeholder="Escribe el nombre..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={onGuess}
        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
      >
        ¡Adivinar!
      </button>
    </div>
  );
}