import { Signal, BatteryFull, Mail, Phone } from "lucide-react";

export default function Home({ time, date }) {
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
        <div className="flex items-center justify-center gap-1"><Mail className="h-3"/> 2 mensagens</div>
        <div className="flex items-center justify-center gap-1"><Phone className="h-3"/> 1 chamada perdida</div>
      </div>
      {/* Instrução */}
      <div className="absolute bottom-2 text-xs text-green-600">
        Pressione OK para Menu
      </div>
    </div>
  );
}