import React, { useState } from "react";

const menuItems = ["Mensagens", "Contatos", "Jogos", "Configurações"];

export default function App() {
  const [selected, setSelected] = useState(0);

  const handleKey = (dir) => {
    if (dir === "up")
      setSelected((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));
    if (dir === "down")
      setSelected((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="relative flex flex-col items-center w-[360px] rounded-[32px] bg-gradient-to-b from-gray-800 via-gray-900 to-black border-[3px] border-gray-700 shadow-[0_12px_50px_12px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3)] pb-8 pt-4 before:absolute before:inset-0 before:rounded-[32px] before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-gray-600 before:opacity-20 before:pointer-events-none">
        {/* Speaker */}
        <div className="w-16 h-2 bg-gradient-to-b from-gray-900 to-black rounded-full mt-2 mb-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),inset_0_-1px_2px_rgba(255,255,255,0.1)] border border-gray-800" />

        {/* Logo */}
        <div className="text-gray-300 text-lg mb-2 drop-shadow-lg font-bold tracking-widest">
          NOKIA
        </div>

        {/* Screen */}
        <div className="w-[280px] h-[220px] rounded-lg border-4 border-gray-600 bg-gradient-to-b from-green-100 to-green-200 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.5)] flex flex-col justify-start mb-4">
          <div className="flex justify-between px-4 pt-2 text-green-700 text-2xl">
            <span>12:34</span>
            <span>🔋</span>
          </div>
          <div className="flex flex-col gap-2 mt-4 pl-6">
            {menuItems.map((item, idx) => (
              <div
                key={item}
                className={`text-2xl px-2 rounded tracking-wide ${
                  selected === idx
                    ? "bg-blue-200 text-blue-900"
                    : "text-blue-900 opacity-70"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Keypad */}
        <div className="flex flex-col items-center w-full  ">
          {/* Navigation */}
          {/* Botões de menu e direcionais estilo Nokia */}
          <div className="flex flex-col items-center mb-2 w-full">
            {/* Linha dos botões de menu */}
            <div className="flex w-full justify-between mb-1 px-2">
              <button className="w-14 h-8 rounded-lg bg-gradient-to-b from-blue-800 to-blue-600 border-2 border-blue-900 text-white text-sm font-bold shadow active:bg-blue-900">
                {/* Ícone/menu esquerdo */}
                <span className="text-lg">_</span>
              </button>
              <button className="w-14 h-8 rounded-lg bg-gradient-to-b from-blue-800 to-blue-600 border-2 border-blue-900 text-white text-sm font-bold shadow active:bg-blue-900">
                {/* Ícone/menu direito */}
                <span className="text-lg">_</span>
              </button>
            </div>
            {/* Direcional em cruz */}
            <div className="relative w-28 h-20 flex items-center justify-center">
              {/* Cima */}
              <button
                onClick={() => handleKey("up")}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-7 rounded-lg bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-blue-900 text-white font-bold shadow active:bg-blue-900"
              >
                ▲
              </button>
              {/* Esquerda */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-10 rounded-lg bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-blue-900 text-white font-bold shadow active:bg-blue-900">
                ◀
              </button>
              {/* Centro (OK) */}
              <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-b from-blue-600 to-blue-900 border-2 border-blue-900 text-white text-lg font-bold shadow active:bg-blue-900">
                OK
              </button>
              {/* Direita */}
              <button className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-10 rounded-lg bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-blue-900 text-white font-bold shadow active:bg-blue-900">
                ▶
              </button>
              {/* Baixo */}
              <button
                onClick={() => handleKey("down")}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-7 rounded-lg bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-blue-900 text-white font-bold shadow active:bg-blue-900"
              >
                ▼
              </button>
            </div>
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-3  gap-3 mb-2 bg-gradient-to-b from-gray-900 to-black rounded-2xl p-3 border-4 border-gray-700 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6),inset_0_-2px_4px_rgba(255,255,255,0.1)]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
              (n) => (
                <button
                  key={n}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-gray-600 text-gray-900 text-3xl font-extrabold shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_3px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.2)] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] transition"
                >
                  {n}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
