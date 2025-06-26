import { Phone, User } from "lucide-react";
import { useKeypad } from "../contexts/KeypadContext";

export default function Calling({ contact, dialNumber, onEnd }) {
  useKeypad((e) => {
    if (
      e.key === "Escape" ||
      e.key === "Backspace"
    ) {
      onEnd();
    }
  });

  return (
    <div className="flex flex-col h-full justify-center items-center py-6 ">
      <div className="flex flex-col items-center mb-4">
        <User className="h-12 w-12 text-green-700 mb-2" />
        <div className="text-2xl font-bold text-green-800 mb-1">
          {contact?.name || "Número"}
        </div>
        <div className="text-lg text-green-700">
          {contact?.number || dialNumber}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center animate-pulse ">
        <Phone className="h-10 w-10 text-green-700  mb-2" />
        <span className="text-green-800 text-lg font-bold tracking-widest mb-1">
          Chamando...
        </span>
      </div>
      <div className="text-xs text-green-700 mt-4 text-center">
        Pressione Voltar para desligar
      </div>
    </div>
  );
}