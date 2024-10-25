"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { GameBoard } from "@/components/GameBoard";
import { GameHeader } from "@/components/GameHeader";
import { LoginButton } from "@/components/LoginButton";

export default function Home() {
  const { user, isAuthenticated } = useAuth0();
  const [score, setScore] = useState(0);
  const [consecutiveWins, setConsecutiveWins] = useState(0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <LoginButton />
      </div>
    );
  }

  const handleGameEnd = (result: "win" | "lose" | "draw") => {
    switch (result) {
      case "win":
        setScore((prevScore) => prevScore + 1);
        setConsecutiveWins((prevWins) => {
          const newWins = prevWins + 1;
          if (newWins === 3) {
            setScore((prevScore) => prevScore + 1);
            return 0;
          }
          return newWins;
        });
        break;
      case "lose":
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
        setConsecutiveWins(0);
        break;
      case "draw":
        setConsecutiveWins(0);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <GameHeader
          score={score}
          consecutiveWins={consecutiveWins}
          userName={user?.name || "Player"}
        />
        <GameBoard onGameEnd={handleGameEnd} />
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Win 3 times in a row to get a bonus point!
          </p>
        </div>
      </div>
    </div>
  );
}
