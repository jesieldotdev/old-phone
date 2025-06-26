import React, { useState, useRef, useEffect } from "react";

interface GamesMenuProps {
  onSelect: (game: string) => void;
  onExit: () => void;
  games: {
    name: string;
    description: string;
}[]
  selectedGame: number
  setSelectedGame: React.Dispatch<React.SetStateAction<number>>
}


export default function GamesMenu({ onSelect, onExit,
  selectedGame, setSelectedGame, games
 }: GamesMenuProps) {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Navegação por teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setSelectedGame((prev) => (prev === 0 ? games.length - 1 : prev - 1));
      }
      if (e.key === "ArrowDown") {
        setSelectedGame((prev) => (prev === games.length - 1 ? 0 : prev + 1));
      }
      if (e.key === "Enter") {
        onSelect(games[selectedGame].name);
      }
      if (e.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedGame, onSelect, onExit]);

  // Centraliza o item selecionado
  useEffect(() => {
    if (itemRefs.current[selectedGame]) {
      itemRefs.current[selectedGame]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [selectedGame]);

  return (
    <div className="flex flex-col h-full font-mono select-none">
      <div className="flex justify-between px-4 pt-2 text-green-700 text-lg">
        <span>JOGOS</span>
        <span className="text-xs">↑↓: Navegar</span>
      </div>
      <div className="flex-1 flex flex-col gap-1 mt-2 px-2 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-green-50">
        {games.map((game, idx) => (
          <div
            key={game.name}
            ref={el => itemRefs.current[idx] = el}
            className={`text-lg px-2 py-1 rounded cursor-pointer transition
              ${selectedGame === idx ? "bg-green-200 text-green-900 font-bold" : "text-green-900 opacity-70"}
            `}
            onClick={() => onSelect(game.name)}
            tabIndex={0}
          >
            <div className="flex items-center gap-2">
              <span>{idx + 1}.</span>
              <span>{game.name}</span>
            </div>
            <div className="text-xs text-green-700 ml-6">{game.description}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-green-600 text-center mt-1">
        OK/Enter: Selecionar • ESC: Voltar
      </div>
    </div>
  );
}