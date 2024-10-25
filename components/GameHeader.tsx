interface GameHeaderProps {
  score: number;
  consecutiveWins: number;
  userName: string;
}

export const GameHeader = ({
  score,
  consecutiveWins,
  userName,
}: GameHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {userName}!
      </h1>
      <div className="flex justify-center gap-8 text-lg">
        <div className="bg-white px-6 py-3 rounded-lg shadow-md">
          <p className="font-semibold text-gray-700">
            Score: <span className="text-blue-600">{score}</span>
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-lg shadow-md">
          <p className="font-semibold text-gray-700">
            Consecutive Wins:{" "}
            <span className="text-green-600">{consecutiveWins}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
