import React, { useState, useRef, useEffect } from "react";
import { Menu, Delete, Signal, BatteryFull, Phone, Mail } from "lucide-react";

const menuItems = [
  "Mensagens", "Contatos", "Jogos", "Configurações", 
];

const THEMES = {
  classico: {
    carcaca: {
      backgroundImage: `
        url('https://www.transparenttextures.com/patterns/diamond-upholstery.png'),
        linear-gradient(to bottom, #2d3748, #1a202c 60%, #000 100%)
      `,
      backgroundBlendMode: "overlay",
      backgroundSize: "auto, cover"
    },
    border: "border-gray-700",
    keypad: "bg-gradient-to-b from-gray-900 to-black border-gray-700",
    button: {
      bg: "bg-gradient-to-b from-blue-200 via-blue-400 to-blue-800 border-blue-900 text-white",
      shadow: "shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)]"
    }
  },
  metalico: {
    carcaca: {
      backgroundImage: `
        url('https://www.transparenttextures.com/patterns/brushed-alum.png'),
        linear-gradient(160deg, #e0e5ec 0%, #bfc7ce 40%, #6b7c93 100%)
      `,
      backgroundBlendMode: "overlay",
      backgroundSize: "auto, cover"
    },
    border: "border-gray-500",
    keypad: "bg-gradient-to-b from-gray-700 to-gray-900 border-gray-500",
    button: {
      bg: "bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 border-gray-500 text-gray-900",
      shadow: "shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.7)]"
    }
  }
};

export default function App() {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("nokiaTema") || "classico";
  });
  const [screen, setScreen] = useState("home"); // "home" ou "menu"
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(null);
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit' 
    });
  });
  const itemRefs = useRef([]);

  // Atualiza o relógio e data a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('pt-BR', { 
        weekday: 'short', 
        day: '2-digit', 
        month: '2-digit' 
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Salva o tema no localStorage
  useEffect(() => {
    localStorage.setItem("nokiaTema", tema);
  }, [tema]);

  // Centraliza o item selecionado ao navegar
  useEffect(() => {
    if (itemRefs.current[selected] && screen === "menu") {
      itemRefs.current[selected].scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
  }, [selected, screen]);

  // Função para tocar beep
  const beep = () => {
    const audio = new window.Audio("/beep.mp3");
    audio.currentTime = 0;
    audio.play().catch(() => {}); // Ignora erro se não houver áudio
  };

  // Navegação do menu
  const handleKey = (dir) => {
    beep();
    if (screen === "menu") {
      if (dir === "up")
        setSelected((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));
      if (dir === "down")
        setSelected((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1));
    }
  };

  // Selecionar item do menu
  const handleSelect = () => {
    beep();
    if (screen === "home") {
      setScreen("menu");
    } else if (screen === "menu") {
      setActive(selected);
    }
  };

  // Voltar para tela inicial
  const handleBack = () => {
    beep();
    if (screen === "menu") {
      setScreen("home");
      setActive(null);
    }
  };

  // Atalhos de teclado físico
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowUp") handleKey("up");
      if (e.key === "ArrowDown") handleKey("down");
      if (e.key === "Enter") handleSelect();
      if (e.key === "Escape") handleBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line
  }, [screen, selected]);

  // Renderiza o conteúdo da tela
  const renderScreen = () => {
    if (screen === "home") {
      return (
        <div className="flex flex-col items-center mt-2 h-full text-center">
          {/* Operadora e sinal */}
          <div className="flex justify-between w-full px-4 mb-2">
            <div className="flex items-center gap-1 text-sm text-green-700">
              <Signal className="h-5"/>
              <span>Vivo</span>
            </div>
            <div className="text-sm text-green-700"><BatteryFull className="h-6"/></div>
          </div>
          
          {/* Hora principal */}
          <div className="text-6xl font-bold text-green-800 mb-2">
            {time}
          </div>
          
          {/* Data */}
          <div className="text-lg text-green-700 mb-4 capitalize">
            {date}
          </div>
          
          {/* Informações adicionais */}
          <div className="text-sm text-green-600 space-y-1">
            <div className="flex items-center"><Mail className="h-3"/> 2 mensagens</div>
            <div className="flex items-center"><Phone className="h-3"/> 1 chamada perdida</div>
          </div>
          
          {/* Instrução */}
          <div className="absolute bottom-2 text-xs text-green-600">
            Pressione OK para Menu
          </div>
        </div>
      );
    }

    if (screen === "menu") {
      return (
        <div className="flex flex-col h-full">
          <div className="flex justify-between px-4 pt-2 text-green-700 text-xl">
            <span>{time}</span>
            <span><BatteryFull className="h-6"/></span>
          </div>
          <div className="flex-1 flex flex-col gap-2 mt-4 pl-6 pr-2 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
            {menuItems.map((item, idx) => (
              <div
                key={item}
                ref={el => itemRefs.current[idx] = el}
                className={`text-3xl px-2 rounded tracking-wide cursor-pointer transition
                  ${selected === idx ? "bg-blue-200 text-blue-900" : "text-blue-900 opacity-70"}
                  ${active === idx ? "ring-2 ring-blue-500" : ""}
                `}
                onClick={() => { setSelected(idx); handleSelect(); }}
                tabIndex={0}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 select-none">
      <div
        className={`relative flex flex-col items-center w-[340px] rounded-[100px] border-[0px] ${THEMES[tema].border} shadow-[0_12px_50px_12px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3)] pb-8 pt-4`}
        style={THEMES[tema].carcaca}
      >
        {/* Botão de alternância de tema */}
        <button
          onClick={() => { beep(); setTema(tema === "classico" ? "metalico" : "classico"); }}
          className="absolute top-2 right-2 px-3 py-1 rounded bg-gray-800 text-xs text-white opacity-70 hover:opacity-100 transition"
        >
          {tema === "classico" ? "Metálico" : "Clássico"}
        </button>

        {/* Speaker */}
        <div className="w-16 h-2 bg-gradient-to-b from-gray-900 to-black rounded-full mt-2 mb-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),inset_0_-1px_2px_rgba(255,255,255,0.1)] border border-gray-800" />

        {/* Logo */}
        <div className="text-gray-300 text-lg mb-2 drop-shadow-lg font-bold tracking-widest">
          NOKIA
        </div>

        {/* Screen */}
        <div className="w-[280px] h-[260px] rounded-lg border-4 border-gray-900 bg-gradient-to-b from-green-100 to-green-200 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.5)] flex flex-col justify-start mb-4 relative">
          {renderScreen()}
        </div>

        {/* Keypad */}
        <div className="flex flex-col items-center w-full">
          {/* Botões de menu com Lucide Icons */}
          <div className="flex w-full justify-between items-center px-8">
            <button
              className={`w-16 h-10 flex items-center justify-center rounded-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} ${THEMES[tema].button.shadow} active:shadow-inner transition`}
              aria-label="Menu"
              onClick={() => { beep(); setScreen("menu"); }}
            >
              <Menu size={18} className={tema === "classico" ? "text-blue-900" : "text-gray-700"} />
            </button>
            <button
              className={`w-16 h-10 flex items-center justify-center rounded-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} ${THEMES[tema].button.shadow} active:shadow-inner transition`}
              aria-label="Voltar"
              onClick={handleBack}
            >
              <Delete size={18} className={tema === "classico" ? "text-blue-900" : "text-gray-700"} />
            </button>
          </div>
          {/* Direcional em cruz, espaçado */}
          <div className="flex flex-col items-center">
            {/* Cima */}
            <button
              onClick={() => handleKey("up")}
              className={`w-16 h-10 mb-1 rounded-t-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} font-bold ${THEMES[tema].button.shadow} active:shadow-inner transition`}
            >
              ▲
            </button>
            <div className="flex flex-row items-center">
              {/* Esquerda */}
              <button
                className={`w-12 h-12 mr-1 rounded-l-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} font-bold ${THEMES[tema].button.shadow} active:shadow-inner transition`}
                onClick={beep}
              >
                ◀
              </button>
              {/* Centro (OK) */}
              <button
                className={`w-16 h-12 rounded-lg ${THEMES[tema].button.bg} border-2 ${THEMES[tema].border} font-bold ${THEMES[tema].button.shadow} active:shadow-inner transition`}
                onClick={handleSelect}
              >
                OK
              </button>
              {/* Direita */}
              <button
                className={`w-12 h-12 ml-1 rounded-r-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} font-bold ${THEMES[tema].button.shadow} active:shadow-inner transition`}
                onClick={beep}
              >
                ▶
              </button>
            </div>
            {/* Baixo */}
            <button
              onClick={() => handleKey("down")}
              className={`w-16 h-10 mt-1 rounded-b-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} font-bold ${THEMES[tema].button.shadow} active:shadow-inner transition`}
            >
              ▼
            </button>
          </div>

          {/* Numpad centralizado e estilizado */}
          <div className={`w-fit mx-auto grid grid-cols-3 gap-2 mb-2 mt-2 rounded-2xl p-3 border-2 ${THEMES[tema].keypad}`}>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
              (n) => (
                <button
                  key={n}
                  className={`w-16 h-12 rounded-lg ${THEMES[tema].button.bg} text-2xl font-bold ${THEMES[tema].button.shadow} active:shadow-inner transition`}
                  onClick={beep}
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