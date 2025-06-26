import React, { useEffect, useRef, useState } from "react";

const GRID_SIZE = 16;
const CELL_SIZE = 10;
const DIMENSION = GRID_SIZE * CELL_SIZE;

type Pos = { x: number; y: number };
type Enemy = Pos;
type Bullet = Pos;

function getRandomEnemyY() {
  return Math.floor(Math.random() * GRID_SIZE);
}

export default function SpaceImpact({ onExit }: { onExit?: () => void }) {
  const [player, setPlayer] = useState<Pos>({ x: 1, y: Math.floor(GRID_SIZE / 2) });
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Movimento dos inimigos e balas
  useEffect(() => {
    if (gameOver) return;
    intervalRef.current = setInterval(() => {
      setEnemies((prev) =>
        prev
          .map((e) => ({ ...e, x: e.x - 1 }))
          .filter((e) => e.x >= 0)
      );
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, x: b.x + 1 }))
          .filter((b) => b.x < GRID_SIZE)
      );
      // Colisão bala-inimigo
      setEnemies((prevEnemies) => {
        let newEnemies = prevEnemies;
        setBullets((prevBullets) => {
          let newBullets = prevBullets;
          prevEnemies.forEach((enemy) => {
            prevBullets.forEach((bullet) => {
              if (enemy.x === bullet.x && enemy.y === bullet.y) {
                setScore((s) => s + 1);
                newEnemies = newEnemies.filter((e) => e !== enemy);
                newBullets = newBullets.filter((b) => b !== bullet);
              }
            });
          });
          return newBullets;
        });
        return newEnemies;
      });
      // Colisão inimigo-jogador
      setEnemies((prev) => {
        if (prev.some((e) => e.x === player.x && e.y === player.y)) {
          setGameOver(true);
          return [];
        }
        return prev;
      });
      // Spawn de inimigos
      if (Math.random() < 0.15) {
        setEnemies((prev) => [
          ...prev,
          { x: GRID_SIZE - 1, y: getRandomEnemyY() },
        ]);
      }
    }, 100);
    return () => clearInterval(intervalRef.current!);
  }, [gameOver, player]);

  // Controles de teclado
  useEffect(() => {
    if (gameOver) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && player.y > 0) setPlayer((p) => ({ ...p, y: p.y - 1 }));
      if (e.key === "ArrowDown" && player.y < GRID_SIZE - 1) setPlayer((p) => ({ ...p, y: p.y + 1 }));
      if (e.key === " " || e.key === "Enter") {
        setBullets((prev) => [
          ...prev,
          { x: player.x + 1, y: player.y },
        ]);
      }
      if (e.key === "Escape" && onExit) onExit();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [player, gameOver, onExit]);

  function restart() {
    setPlayer({ x: 1, y: Math.floor(GRID_SIZE / 2) });
    setEnemies([]);
    setBullets([]);
    setScore(0);
    setGameOver(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full font-mono select-none">
      <div className="flex justify-between w-full px-2 text-blue-700 text-xs mb-1">
        <span>JOGO: SPACE IMPACT</span>
        <span>PONTOS: {score}</span>
      </div>
      <div
        className="relative"
        style={{
          width: DIMENSION,
          height: DIMENSION,
          background: "#e0e7ef",
          border: "2px solid #1e3a8a",
          boxShadow: "inset 0 2px 8px #1e3a8a44",
          imageRendering: "pixelated",
        }}
      >
        <svg width={DIMENSION} height={DIMENSION} style={{ display: "block" }}>
          {/* Grid */}
          {[...Array(GRID_SIZE + 1)].map((_, i) => (
            <React.Fragment key={i}>
              <line
                x1={0}
                y1={(DIMENSION / GRID_SIZE) * i}
                x2={DIMENSION}
                y2={(DIMENSION / GRID_SIZE) * i}
                stroke="#b6c7e6"
                strokeWidth={i % 4 === 0 ? 1.5 : 0.5}
              />
              <line
                x1={(DIMENSION / GRID_SIZE) * i}
                y1={0}
                x2={(DIMENSION / GRID_SIZE) * i}
                y2={DIMENSION}
                stroke="#b6c7e6"
                strokeWidth={i % 4 === 0 ? 1.5 : 0.5}
              />
            </React.Fragment>
          ))}
          {/* Player */}
          <rect
            x={player.x * CELL_SIZE}
            y={player.y * CELL_SIZE}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill="#2563eb"
            stroke="#1e40af"
            strokeWidth={0.5}
            rx={2}
            ry={2}
          />
          {/* Bullets */}
          {bullets.map((b, i) => (
            <rect
              key={i}
              x={b.x * CELL_SIZE + CELL_SIZE / 4}
              y={b.y * CELL_SIZE + CELL_SIZE / 4}
              width={CELL_SIZE / 2}
              height={CELL_SIZE / 2}
              fill="#facc15"
              stroke="#b45309"
              strokeWidth={0.5}
              rx={1}
              ry={1}
            />
          ))}
          {/* Enemies */}
          {enemies.map((e, i) => (
            <rect
              key={i}
              x={e.x * CELL_SIZE}
              y={e.y * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill="#dc2626"
              stroke="#7f1d1d"
              strokeWidth={0.5}
              rx={2}
              ry={2}
            />
          ))}
        </svg>
        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e0e7efcc]">
            <div className="text-blue-900 text-2xl font-bold mb-2">GAME OVER</div>
            <div className="text-blue-800 text-sm mb-2">Pontuação: {score}</div>
            <button
              className=" text-blue-900 px-4 py-1 rounded font-bold"
              onClick={restart}
            >
              REINICIAR
            </button>
            <button
              className="mt-2 text-xs text-blue-700 "
              onClick={onExit}
            >
              Voltar
            </button>
          </div>
        )}
      </div>
      <div className="text-xs text-blue-700 mt-2">
        ↑↓: mover • Espaço/OK: atirar • ESC: voltar
      </div>
    </div>
  );
}