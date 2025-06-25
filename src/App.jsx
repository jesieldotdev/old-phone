import React, { useState } from "react";

const menuItems = ["Mensagens", "Contatos", "Jogos", "Configurações"];

export default function App() {
  const [selected, setSelected] = useState(0);

  const handleKey = (dir) => {
    if (dir === "up") setSelected((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));
    if (dir === "down") setSelected((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="relative flex flex-col items-center w-[340px] rounded-[48px] bg-gradient-to-b from-blue-900 to-blue-800 border-8 border-blue-200 shadow-2xl pb-6 pt-4">
        {/* Speaker */}
        <div className="w-16 h-2 bg-gray-800 rounded-full mt-2 mb-1 shadow-inner" />
        {/* Logo */}
        <div className="text-white  text-lg mb-2 drop-shadow">NOKIA</div>
        {/* Screen */}
        <div className="w-[220px] h-[110px] rounded-2xl border-4 border-blue-200 bg-gradient-to-b from-green-100 to-green-200 shadow-inner flex flex-col justify-start mb-4">
          <div className="flex justify-between px-4 pt-2 text-green-700  text-lg">
            <span>12:34</span>
            <span>🔋</span>
          </div>
          <div className="flex flex-col gap-2 mt-4 pl-6">
            {menuItems.map((item, idx) => (
              <div
                key={item}
                className={`text-lg  px-2 rounded ${selected === idx
                  ? "bg-blue-200 text-blue-900 "
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
          {/* Navigation */}
          <div className="flex flex-col items-center mb-2">
            <button
              onClick={() => handleKey("up")}
              className="w-9 h-9 rounded-full bg-blue-200 text-blue-900 font-bold mb-1 shadow active:bg-blue-400"
            >
              ▲
            </button>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-blue-200 text-blue-900 font-bold shadow active:bg-blue-400">
                ◀
              </button>
              <button className="w-9 h-9 rounded-full bg-green-700 text-white font-bold shadow active:bg-green-900">
                OK
              </button>
              <button className="w-9 h-9 rounded-full bg-blue-200 text-blue-900 font-bold shadow active:bg-blue-400">
                ▶
              </button>
            </div>
            <button
              onClick={() => handleKey("down")}
              className="w-9 h-9 rounded-full bg-blue-200 text-blue-900 font-bold mt-1 shadow active:bg-blue-400"
            >
              ▼
            </button>
          </div>
          {/* Numpad */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((n) => (
              <button
                key={n}
                className="w-12 h-12 rounded-xl bg-gray-100 border-2 border-blue-200 text-blue-900 text-xl  shadow active:bg-blue-200"
              >
                {n}
              </button>
            ))}
          </div>
          {/* Actions */}
          <div className="flex gap-6 mt-2">
            <button className="w-20 h-8 rounded-lg bg-red-700 text-white font-bold shadow active:bg-red-900">
              Cancelar
            </button>
            <button className="w-20 h-8 rounded-lg bg-green-700 text-white font-bold shadow active:bg-green-900">
              Atender
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
