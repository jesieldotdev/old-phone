import React, { useState } from "react";
import { Menu, Delete } from "lucide-react"; // Importando Lucide Icons

const menuItems = ["Mensagens", "Contatos", "Jogos", "Configurações", ];

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
      <div className="relative flex flex-col items-center w-[340px] rounded-[32px] bg-gradient-to-b from-gray-800 via-gray-900 to-black border-[0px] border-gray-700 shadow-[0_12px_50px_12px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3)] pb-8 pt-4">
        {/* Speaker */}
        <div className="w-16 h-2 bg-gradient-to-b from-gray-900 to-black rounded-full mt-2 mb-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),inset_0_-1px_2px_rgba(255,255,255,0.1)] border border-gray-800" />

        {/* Logo */}
        <div className="text-gray-300 text-lg mb-2 drop-shadow-lg font-bold tracking-widest">
          NOKIA
        </div>

        {/* Screen */}
        <div className="w-[280px] h-[220px] rounded-lg border-4 border-gray-900 bg-gradient-to-b from-green-100 to-green-200 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.5)] flex flex-col justify-start mb-4">
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
        <div className="flex flex-col items-center w-full">
          {/* Botões de menu com Lucide Icons */}
          <div className="flex w-full justify-between items-center px-8  ">
            <button
              className="w-16 h-8 flex items-center justify-center rounded-2xl bg-gradient-to-b from-gray-100 via-blue-100 to-blue-300 border border-blue-700 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.7)] active:shadow-inner active:bg-blue-200 transition"
              aria-label="Menu"
            >
              <Menu size={18} className="text-blue-900" />
            </button>
            <button
              className="w-16 h-8 flex items-center justify-center rounded-2xl bg-gradient-to-b from-gray-100 via-blue-100 to-blue-300 border border-blue-700 shadow-[0_1px_4px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.7)] active:shadow-inner active:bg-blue-200 transition"
              aria-label="Apagar"
            >
              <Delete size={18} className="text-blue-900" />
            </button>
          </div>
          {/* Direcional em cruz, espaçado */}
          <div className="flex flex-col items-center">
            {/* Cima */}
            <button
              onClick={() => handleKey("up")}
              className="w-12 h-10 mb-1 rounded-t-lg bg-gradient-to-b from-blue-200 via-blue-400 to-blue-800 border border-blue-900 text-blue-900 font-bold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)] active:shadow-inner active:bg-blue-800 transition"
            >
              ▲
            </button>
            <div className="flex flex-row items-center">
              {/* Esquerda */}
              <button
                className="w-10 h-12 mr-1 rounded-l-lg bg-gradient-to-r from-blue-200 via-blue-400 to-blue-800 border border-blue-900 text-blue-900 font-bold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)] active:shadow-inner active:bg-blue-800 transition"
              >
                ◀
              </button>
              {/* Centro (OK) */}
              <button
                className="w-12 h-12 rounded-lg bg-gradient-to-b from-blue-100 via-blue-400 to-blue-900 border-2 border-blue-900 text-white text-lg font-bold shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_2px_8px_rgba(255,255,255,0.5)] active:shadow-inner active:bg-blue-800 transition"
              >
                OK
              </button>
              {/* Direita */}
              <button
                className="w-10 h-12 ml-1 rounded-r-lg bg-gradient-to-l from-blue-200 via-blue-400 to-blue-800 border border-blue-900 text-blue-900 font-bold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)] active:shadow-inner active:bg-blue-800 transition"
              >
                ▶
              </button>
            </div>
            {/* Baixo */}
            <button
              onClick={() => handleKey("down")}
              className="w-12 h-10 mt-1 rounded-b-lg bg-gradient-to-t from-blue-200 via-blue-400 to-blue-800 border border-blue-900 text-blue-900 font-bold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)] active:shadow-inner active:bg-blue-800 transition"
            >
              ▼
            </button>
          </div>

          {/* Numpad com o mesmo estilo dos direcionais */}
          <div className="grid grid-cols-3 gap-2 mb-2 mt-2 bg-gradient-to-b from-gray-900 to-black rounded-2xl p-3 border-2 border-gray-700 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6),inset_0_-2px_4px_rgba(255,255,255,0.1)]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
              (n) => (
                <button
                  key={n}
                  className="w-16 h-12 rounded-lg bg-gradient-to-b from-blue-200 via-blue-400 to-blue-800 border border-blue-900 text-white text-2xl font-bold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)] active:shadow-inner active:bg-blue-800 transition"
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