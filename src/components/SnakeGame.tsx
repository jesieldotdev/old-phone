import React, { useState, useEffect, useRef } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Cell = [number, number];

const GRID_SIZE = 16;
const INITIAL_SNAKE: Cell[] = [
  [8, 8],
  [8, 9],
  [8, 10],
];
const INITIAL_DIRECTION: Direction = "UP";

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
}: {
  onExit?: () => void;
}) {
  const [snake, setSnake] = useState<Cell[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Cell>(getRandomCell(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const moveRef = useRef(direction);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Atualiza direção de movimento
  useEffect(() => {
    moveRef.current = direction;
  }, [direction]);

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
    setDirection(INITIAL_DIRECTION);
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
          width: 224,
          height: 224,
          background: "#b6fcb6",
          border: "2px solid #176d1b",
          boxShadow: "inset 0 2px 8px #0a3d0a44",
          imageRendering: "pixelated",
        }}
      >
        {/* Grid */}
        <svg
          width={224}
          height={224}
          style={{ display: "block" }}
        >
          {/* Linhas do grid */}
          {[...Array(GRID_SIZE + 1)].map((_, i) => (
            <React.Fragment key={i}>
              <line
                x1={0}
                y1={(224 / GRID_SIZE) * i}
                x2={224}
                y2={(224 / GRID_SIZE) * i}
                stroke="#a2e59c"
                strokeWidth={i % 4 === 0 ? 1.5 : 0.5}
              />
              <line
                x1={(224 / GRID_SIZE) * i}
                y1={0}
                x2={(224 / GRID_SIZE) * i}
                y2={224}
                stroke="#a2e59c"
                strokeWidth={i % 4 === 0 ? 1.5 : 0.5}
              />
            </React.Fragment>
          ))}
          {/* Corpo da cobra */}
          {snake.map(([x, y], idx) => (
            <rect
              key={idx}
              x={x * 14}
              y={y * 14}
              width={14}
              height={14}
              fill={idx === 0 ? "#176d1b" : "#219c3a"}
              stroke="#0a3d0a"
              strokeWidth={0.5}
              rx={2}
              ry={2}
            />
          ))}
          {/* Comida */}
          <rect
            x={food[0] * 14}
            y={food[1] * 14}
            width={14}
            height={14}
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
              className="bg-green-200 text-green-900 px-4 py-1 rounded font-bold"
              onClick={restart}
            >
              REINICIAR
            </button>
            <button
              className="mt-2 text-xs text-green-700 underline"
              onClick={onExit}
            >
              Voltar
            </button>
          </div>
        )}
      </div>
      {/* Controles virtuais (opcional, para mobile) */}
      <div className="flex flex-col items-center mt-2 gap-1">
        <div className="flex gap-2">
          <button
            className="w-8 h-8 bg-green-200 rounded text-green-900 font-bold"
            onClick={() => direction !== "DOWN" && setDirection("UP")}
          >
            ▲
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="w-8 h-8 bg-green-200 rounded text-green-900 font-bold"
            onClick={() => direction !== "RIGHT" && setDirection("LEFT")}
          >
            ◀
          </button>
          <button
            className="w-8 h-8 bg-green-200 rounded text-green-900 font-bold"
            onClick={() => direction !== "UP" && setDirection("DOWN")}
          >
            ▼
          </button>
          <button
            className="w-8 h-8 bg-green-200 rounded text-green-900 font-bold"
            onClick={() => direction !== "LEFT" && setDirection("RIGHT")}
          >
            ▶
          </button>
        </div>
      </div>
      <div className="text-xs text-green-700 mt-1">ESC: Voltar</div>
    </div>
  );
}