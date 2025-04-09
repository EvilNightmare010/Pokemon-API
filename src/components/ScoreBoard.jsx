export default function ScoreBoard({ score, attempts }) {
  return (
    <div className="text-center space-y-1">
      <p className="text-md text-gray-700 dark:text-white">Puntos: {score}</p>
      <p className="text-md text-gray-700 dark:text-white">Intentos: {attempts}</p>
    </div>
  );
}