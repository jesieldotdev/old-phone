import { Phone } from "lucide-react";

export default function Dialer({ dialNumber }) {
  return (
    <div className="flex flex-col h-full justify-center items-center py-6">
      <div
        className="text-5xl text-green-700 font-bold tracking-widest mb-4 h-12 select-text w-full text-center overflow-x-auto whitespace-nowrap"
        style={{ maxWidth: 260 }}
      >
        {dialNumber || <span className="opacity-40">Digite o número…</span>}
      </div>
      <div className="flex flex-col items-center mt-8">
        <Phone className="h-8 mb-2 text-green-700" />
        <div className="text-xs text-green-700 text-center">
          Use o teclado para digitar<br />
          OK para ligar, Apagar para corrigir, Voltar para sair
        </div>
      </div>
    </div>
  );
}