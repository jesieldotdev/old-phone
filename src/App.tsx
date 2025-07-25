import React, { useState, useRef, useEffect } from "react";
import { Signal, BatteryFull, Phone, Mail, User, Star, Delete } from "lucide-react";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ContactDetail from "./components/ContactDetail";
import Contacts from "./components/Contacts";
import Dialer from "./components/Dialer";
import Calling from "./components/Calling";
import GamesMenu from "./components/GamesMenu";
import SnakeGame from "./components/SnakeGame";
import SpaceImpact from "./components/SpaceImpact";
import Settings from "./components/Settings";
import { useMenuNavigation } from "./hooks/useMenuNavigation";
import {useKeypad} from './contexts/KeypadContext'


const menuItems = [
  "Contatos", "Mensagens", "Jogos", "Configurações", "Rádio", "Alarme", "Calculadora", "Cronômetro", "Agenda", "Galeria", "Notas", "Relógio Mundial", "Despertador", "Bluetooth", "Sobre o Telefone"
];

const games = [
  { name: "Snake", description: "O clássico jogo da cobrinha" },
  { name: "Space Impact", description: "Atire nos inimigos espaciais" },
  { name: "Memory", description: "Jogo da memória retrô" },
  { name: "Bounce", description: "Desvie dos obstáculos" },
];


const contactsList = [
  { name: "Ana Silva", number: "(11) 99999-1234", favorite: true },
  { name: "Bruno Costa", number: "(11) 98888-5678", favorite: false },
  { name: "Carlos Mendes", number: "(11) 97777-9012", favorite: true },
  { name: "Diana Santos", number: "(11) 96666-3456", favorite: false },
  { name: "Eduardo Lima", number: "(11) 95555-7890", favorite: false },
  { name: "Fernanda Rocha", number: "(11) 94444-2345", favorite: true },
  { name: "Gabriel Alves", number: "(11) 93333-6789", favorite: false },
  { name: "Helena Martins", number: "(11) 92222-0123", favorite: false },
  { name: "Igor Pereira", number: "(11) 91111-4567", favorite: false },
  { name: "Julia Ferreira", number: "(11) 90000-8901", favorite: true },
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
    },
    logo: "text-white", // Azul escuro para fundo clássico
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
    },
    logo: "text-blue-700", // Branco para fundo metálico
  }
};

export default function App() {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("nokiaTema") || "classico";
  });
  const [screen, setScreen] = useState("home"); // "home", "menu", "contacts", "contact-detail"
  const [selected, setSelected] = useState(0);
  const {direction, setDirection, setActionKey} = useKeypad();
  const [selectedGame, setSelectedGame] = useState(0);
  const [contactSelected, setContactSelected] = useState(0);
  const [selectedContact, setSelectedContact] = useState<{ name: string; number: string; favorite: boolean } | null>(null);
  const [active, setActive] = useState<number | null>(null);
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
  const [dialNumber, setDialNumber] = useState("");
  const [calling, setCalling] = useState(false);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contactRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [gameScreen, setGameScreen] = useState<null | "menu" | "snake">(null);
  const [soundOn, setSoundOn] = useState(() => {
    const saved = localStorage.getItem("nokiaSound");
    return saved === null ? true : saved === "true";
  });

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

  // Salva o estado do som no localStorage
  useEffect(() => {
    localStorage.setItem("nokiaSound", soundOn.toString());
  }, [soundOn]);

  // Centraliza o item selecionado ao navegar
  useEffect(() => {
    if (itemRefs.current[selected] && screen === "menu") {
      itemRefs.current[selected].scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
    if (contactRefs.current[contactSelected] && screen === "contacts") {
      contactRefs.current[contactSelected].scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
  }, [selected, contactSelected, screen]);

  // Função para tocar beep
  const beep = () => {
    if (!soundOn) return;
    const audio = new window.Audio("/beep.mp3");
    audio.currentTime = 0;
    audio.play().catch(() => { });
  };

  // Navegação do menu
  const handleKey = (dir) => {
    beep();
    if (screen === "menu") {
      if (dir === "up")
        setSelected((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));
      if (dir === "down")
        setSelected((prev) => (prev === menuItems.length - 1 ? 0 : prev + 1));
    } else if (screen === "contacts") {
      if (dir === "up")
        setContactSelected((prev) => (prev === 0 ? contactsList.length - 1 : prev - 1));
      if (dir === "down")
        setContactSelected((prev) => (prev === contactsList.length - 1 ? 0 : prev + 1));
    } else if (screen === "games-menu") {
      if (dir === "up")
        setSelectedGame((prev) => (prev === 0 ? games.length - 1 : prev - 1))

      if (dir === 'down')
        setSelectedGame((prev => (prev === games.length - 1 ? 0 : prev + 1)))
    }
    else if (screen === "snake") {
        setDirection(dir.toUpperCase())

    }
  };

  // Selecionar item do menu
  const handleSelect = () => {
    beep();
    if (screen === "home") {
      setScreen("menu");
    } else if (screen === "menu") {
      setActive(selected);
      if (menuItems[selected] === "Contatos") {
        setScreen("contacts");
        setContactSelected(0);
      }
      else if (menuItems[selected] === "Jogos") {
        setScreen("games-menu");
        setSelectedGame(0);
      }
      else if (menuItems[selected] === "Configurações") {
        setScreen("settings");
      }
    } else if (screen === "contacts") {
      setSelectedContact(contactsList[contactSelected]);
      setScreen("contact-detail");
    } else if (screen === "dialer") {
      handleDialCall();
    }
    else if (screen === "games-menu") {
      if (games[selectedGame].name === 'Snake') {
        setScreen('snake')
      }
      else if (games[selectedGame].name === 'Space Impact') {
        setScreen('space-impact')
      }
    }


  };

  // Voltar para tela anterior
  const handleBack = () => {
    beep();
    if (screen === "menu") {
      setScreen("home");
      setActive(null);
    } else if (screen === "contacts") {
      setScreen("menu");
    } else if (screen === "contact-detail") {
      setScreen("contacts");
    } else if (screen === "dialer") {
      setDialNumber("");
      setScreen("home");
    } else if (screen === "games-menu") {
      setScreen("menu");
    } else if (screen === 'snake') {
      setScreen('games-menu')
    } else if (screen === 'space-impact') {
      setScreen('games-menu')
    }
  };

  // Ação de ligar
  const handleCall = () => {
    beep();
    if (selectedContact) {
      alert(`📞 Ligando para ${selectedContact.name}...\n${selectedContact.number}`);
    }
  };

  // Ação de enviar SMS
  const handleSMS = () => {
    beep();
    if (selectedContact) {
      alert(`💬 Enviando SMS para ${selectedContact.name}...\n${selectedContact.number}`);
    }
  };

  // Chamada a partir da tela de discagem
  const handleDialCall = () => {
    beep();
    if (dialNumber) {
      setCalling(true);
    }
  };

  useMenuNavigation(
    screen,
    handleKey,
    handleSelect,
    handleBack,
    dialNumber,
    setDialNumber,
    beep
  );



  // Renderiza o conteúdo da tela
  const renderScreen = () => {
    if (calling) {
      return (
        <Calling
          contact={null}
          dialNumber={dialNumber}
          onEnd={() => {
            setCalling(false);
            setDialNumber("");
            setScreen("home");
          }}
        />
      );
    }

    if (screen === "games-menu") {
      return (
        <GamesMenu
          games={games}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          onSelect={(game) => {
            if (game === "Snake") setScreen("snake");
            if (game === "Space Impact") setScreen("space-impact");
          }}
          onExit={() => setScreen(null)}
        />
      );
    }
    if (screen === "snake") {
      return <SnakeGame onExit={() => setScreen("games-menu")} />;
    }
    if (screen === "space-impact") {
      return <SpaceImpact onExit={() => setScreen("games-menu")} />;
    }
    if (screen === "home") {
      return <Home time={time} date={date} />;
    }
    if (screen === "menu") {
      return (
        <Menu
          time={time}
          menuItems={menuItems}
          selected={selected}
          active={active}
          itemRefs={itemRefs}
          setSelected={setSelected}
          handleSelect={handleSelect}
        />
      );
    }
    if (screen === "contacts") {
      return (
        <Contacts
          contactsList={contactsList}
          contactSelected={contactSelected}
          contactRefs={contactRefs}
          setContactSelected={setContactSelected}
          handleSelect={handleSelect}
        />
      );
    }
    if (screen === "contact-detail") {
      return (
        <ContactDetail
          selectedContact={selectedContact}
          handleCall={handleCall}
          handleSMS={handleSMS}
        />
      );
    }
    if (screen === "dialer") {
      return (
        <Dialer
          dialNumber={dialNumber}
          setDialNumber={setDialNumber}
          handleBack={() => {
            setDialNumber("");
            setScreen("home");
          }}
        />
      );
    }
    if (screen === "settings") {
      return (
        <Settings
          soundOn={soundOn}
          setSoundOn={setSoundOn}
          onBack={() => setScreen("menu")}
        />
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
        <div className={`${THEMES[tema].logo} text-lg mb-2 drop-shadow-lg font-bold tracking-widest`}>
          NOKIA
        </div>

        {/* Screen */}
        <div className="relative w-[280px] h-[260px] rounded-lg overflow-hidden crt mb-4 border-4 border-gray-900">
          {/* Conteúdo da tela */}
          <div
            className="w-full h-full flex flex-col justify-start"
            style={{
              backgroundImage: `linear-gradient(to bottom, #e0f7fa, #b2ebf2)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {renderScreen()}
          </div>
          {/* Overlay scanline - sempre por cima */}
          <div className="pointer-events-none absolute inset-0 z-10 crt-scanline" />
          {/* (opcional) Overlay glass, vignette, etc */}
          <div className="pointer-events-none absolute inset-0 z-20 crt-glass" />
        </div>

        {/* Keypad */}
        <div className="flex flex-col items-center w-full">
          {/* Botões de menu com Lucide Icons */}
          <div className="flex w-full justify-between items-center px-8">
            <button
              className={`w-16 h-10 flex items-center justify-center  rounded-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} ${THEMES[tema].button.shadow} active:shadow-inner transition`}
              aria-label="Menu"
              onClick={() => { beep(); setScreen("menu"); }}
            >
              <Phone size={18} className={"text-green-400 "} />
            </button>
            <button
              className={`w-16 h-10 flex items-center justify-center rounded-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} ${THEMES[tema].button.shadow} active:shadow-inner transition`}
              aria-label="Voltar"
              onClick={() => {
                beep();
                if (calling) {
                  setCalling(false);
                  setDialNumber("");
                  setScreen("home");
                } else {
                  handleBack();
                }
              }}
            >

              <Phone size={18} className="text-red-400 rotate-180" />
            </button>
          </div>
          {/* Direcional em cruz, espaçado */}
          <div className="flex flex-col items-center mt-[-32px]">
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
                onClick={() => {
                  beep()
                  handleKey("left")
                }}
              >
                ◀
              </button>
              {/* Centro (OK) */}
              <button
                className={`w-16 h-12 rounded-lg ${THEMES[tema].button.bg} border-2 ${THEMES[tema].border} font-bold ${THEMES[tema].button.shadow} active:shadow-inner transition`}
                onClick={() => {
                  handleSelect()
                  setActionKey("ENTER")
                }}
              >
                OK
              </button>
              {/* Direita */}
              <button
                className={`w-12 h-12 ml-1 rounded-r-lg ${THEMES[tema].button.bg} border ${THEMES[tema].border} font-bold ${THEMES[tema].button.shadow} active:shadow-inner transition`}
                onClick={() => {
                  beep()
                  handleKey("right")
                }}
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
                  onClick={() => {
                    beep();
                    if (screen === "dialer") {
                      // Adiciona o número ao dialNumber
                      setDialNumber((prev) => prev + n);
                    } else if (n === "*") {
                      setScreen("dialer");
                      setDialNumber("");
                    } 
                    // else if (n === "0") {
                    //   setScreen("home");
                    // } 
                    else if(screen === 'home') {
                      setScreen("dialer");
                      setDialNumber(n);
                    }
                  }}
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