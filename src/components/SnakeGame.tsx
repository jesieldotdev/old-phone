import React, { useState, useEffect, useRef } from "react";
import { useKeypad } from "../contexts/KeypadContext";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Cell = [number, number];

const GRID_SIZE = 17;
const CELL_SIZE = 11;
const DIMENSION = GRID_SIZE * CELL_SIZE; // 160
const INITIAL_SNAKE: Cell[] = [
  [8, 8],
  [8, 9],
  [8, 10],
];
// const INITIAL_DIRECTION: Direction = "UP";

function getRandomCell(snake: Cell[]): Cell {
  let cell: Cell;
  do {
    cell = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];
  } while (snake.some(([x, y]) => x === cell[0] && y === cell[1]));
  return cell;
}

export default function SnakeGame({
  onExit,
  setDirection,
  direction
}: {
  onExit?: () => void;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>
  direction: Direction
}) {
  const [snake, setSnake] = useState<Cell[]>(INITIAL_SNAKE);
  // const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Cell>(getRandomCell(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const moveRef = useRef(direction);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Atualiza direção de movimento
  useEffect(() => {
    moveRef.current = direction;
  }, [direction]);


  const beep = () => {
    const audio = new window.Audio("/eat.mp3");
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play().catch(() => { }); // Ignora erro se não houver áudio
  };
  // Loop do jogo
  useEffect(() => {
    if (gameOver) return;

    intervalRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead: Cell;

        switch (moveRef.current) {
          case "UP":
            newHead = [head[0], (head[1] - 1 + GRID_SIZE) % GRID_SIZE];
            break;
          case "DOWN":
            newHead = [head[0], (head[1] + 1) % GRID_SIZE];
            break;
          case "LEFT":
            newHead = [(head[0] - 1 + GRID_SIZE) % GRID_SIZE, head[1]];
            break;
          case "RIGHT":
            newHead = [(head[0] + 1) % GRID_SIZE, head[1]];
            break;
        }
        // Colisão com o próprio corpo
        if (prevSnake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
          setGameOver(true);
          return prevSnake;
        }
        let newSnake;
        // Comeu a comida
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          beep()
          newSnake = [newHead, ...prevSnake];
          setFood(getRandomCell(newSnake));
          setScore((s) => s + 1);
        } else {
          newSnake = [newHead, ...prevSnake.slice(0, -1)];
        }
        return newSnake;
      });
    }, 120);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [food, gameOver]);

  // Controles de teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver && e.key === "Enter") {
        restart();
        return;
      }
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case "Escape":
          if (onExit) onExit();
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction, gameOver, onExit]);

  function restart() {
    setSnake(INITIAL_SNAKE);
    setDirection("UP");
    setFood(getRandomCell(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
  }

  // Renderiza o grid
  return (
    <div className="flex flex-col items-center justify-center h-full w-full font-mono select-none">
      <div className="flex justify-between w-full px-2 text-green-700 text-xs mb-1">
        <span>JOGO: SNAKE</span>
        <span>PONTOS: {score}</span>
      </div>
      <div
        className="relative"
        style={{
          width: DIMENSION,
          height: DIMENSION,
          background: "#b6fcb6",
          border: "2px solid #176d1b",
          boxShadow: "inset 0 2px 8px #0a3d0a44",
          imageRendering: "pixelated",
        }}
      >
        {/* Grid */}
        <svg
          width={DIMENSION}
          height={DIMENSION}
          style={{ display: "block" }}
        >
          {/* Linhas do grid */}
          {[...Array(GRID_SIZE + 1)].map((_, i) => (
            <React.Fragment key={i}>
              <line
                x1={0}
                y1={(DIMENSION / GRID_SIZE) * i}
                x2={DIMENSION}
                y2={(DIMENSION / GRID_SIZE) * i}
                stroke="#a2e59c"
                strokeWidth={i % 4 === 0 ? 1.5 : 0.5}
              />
              <line
                x1={(DIMENSION / GRID_SIZE) * i}
                y1={0}
                x2={(DIMENSION / GRID_SIZE) * i}
                y2={DIMENSION}
                stroke="#a2e59c"
                strokeWidth={i % 4 === 0 ? 1.5 : 0.5}
              />
            </React.Fragment>
          ))}
          {/* Corpo da cobra */}
          {snake.map(([x, y], idx) => (
            <rect
              key={idx}
              x={x * CELL_SIZE}
              y={y * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill={idx === 0 ? "#176d1b" : "#219c3a"}
              stroke="#0a3d0a"
              strokeWidth={0.5}
              rx={2}
              ry={2}
            />
          ))}
          {/* Comida */}
          <rect
            x={food[0] * CELL_SIZE}
            y={food[1] * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill="#e2e600"
            stroke="#b6b600"
            strokeWidth={0.5}
            rx={2}
            ry={2}
          />
        </svg>
        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#b6fcb6cc]">
            <div className="text-green-900 text-2xl font-bold mb-2">GAME OVER</div>
            <div className="text-green-800 text-sm mb-2">Pontuação: {score}</div>
            <button
              className=" text-green-900 px-4 py-1 rounded font-bold"
              onClick={restart}
            >
              REINICIAR
            </button>
            <button
              className="mt-2 text-xs text-green-700 "
              onClick={onExit}
            >
              Voltar
            </button>
          </div>
        )}
      </div>
      {/* Controles virtuais (opcional, para mobile) */}

      <div className="text-xs text-green-700 mt-1">ESC: Voltar</div>
    </div>
  );
}