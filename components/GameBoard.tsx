import { useState, useEffect } from "react";

interface GameBoardProps {
  onGameEnd: (result: "win" | "lose" | "draw") => void;
}

export const GameBoard = ({ onGameEnd }: GameBoardProps) => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState<
    "playing" | "win" | "lose" | "draw"
  >("playing");

  const checkWinner = (squares: Array<string | null>): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (!isPlayerTurn || board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const botMove = () => {
    if (isGameOver) return;

    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((cell): cell is number => cell !== null);

    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newBoard = [...board];
      newBoard[randomCell] = "O";
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setIsGameOver(false);
    setGameStatus("playing");
  };

  useEffect(() => {
    if (!isPlayerTurn && !isGameOver) {
      const timer = setTimeout(botMove, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayerTurn, isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const winner = checkWinner(board);
    const isDraw = !board.includes(null) && !winner;

    if (winner || isDraw) {
      setIsGameOver(true);

      if (winner === "X") {
        setGameStatus("win");
        onGameEnd("win");
      } else if (winner === "O") {
        setGameStatus("lose");
        onGameEnd("lose");
      } else if (isDraw) {
        setGameStatus("draw");
        onGameEnd("draw");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, onGameEnd]);

  const getGameStatusMessage = () => {
    switch (gameStatus) {
      case "win":
        return "You Won! 🎉";
      case "lose":
        return "You Lost!";
      case "draw":
        return "It's a Draw!";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2 w-[300px] mx-auto">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`
              aspect-square text-4xl font-bold border-2 border-gray-300 rounded 
              ${!isGameOver && !cell ? "hover:bg-gray-100" : ""} 
              transition-colors duration-200 flex items-center justify-center
            `}
            onClick={() => handleClick(index)}
            disabled={isGameOver || Boolean(cell)}
          >
            {cell === "X" && <span className="text-blue-600">X</span>}
            {cell === "O" && <span className="text-red-600">O</span>}
          </button>
        ))}
      </div>

      {isGameOver && (
        <div className="flex flex-col items-center gap-2">
          <p
            className={`text-lg font-bold ${
              gameStatus === "win"
                ? "text-green-600"
                : gameStatus === "lose"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {getGameStatusMessage()}
          </p>
          <button
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
