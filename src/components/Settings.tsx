import React from "react";

export default function Settings({
  soundOn,
  setSoundOn,
  onBack,
}: {
  soundOn: boolean;
  setSoundOn: (v: boolean) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full font-mono select-none bg-[#e5ffe5]">
      <div className="flex flex-col w-full max-w-[210px] border-2 border-green-800 bg-[#e5ffe5] shadow-lg">
        {/* Barra de título */}
        <div
          className="w-full text-left text-green-900 text-base font-bold border-b-2 border-green-800 px-2 py-1 tracking-widest bg-green-100"
          style={{ fontFamily: "monospace", letterSpacing: 2 }}
        >
          CONFIGURAÇÕES
        </div>
        {/* Opção de som */}
        <div className="flex flex-row items-center justify-between px-2 py-2 border-b border-green-800">
          <span className="text-green-900 uppercase text-sm tracking-widest">
            Som
          </span>
          <button
            className={`w-20 h-8 border-2 border-green-800 font-bold text-green-900 ${
              soundOn ? "bg-green-200" : "bg-gray-200"
            } active:bg-green-300 transition-none rounded-none uppercase text-sm tracking-widest`}
            style={{ fontFamily: "monospace", letterSpacing: 2 }}
            onClick={() => setSoundOn(!soundOn)}
          >
            {soundOn ? "LIGADO" : "DESLIG."}
          </button>
        </div>
        {/* Botão voltar */}
        <div className="flex w-full justify-end px-2 py-2">
          <button
            className="w-20 h-8 border-2 border-green-800 font-bold text-green-900 bg-white active:bg-green-300 transition-none rounded-none uppercase text-sm tracking-widest"
            style={{ fontFamily: "monospace", letterSpacing: 2 }}
            onClick={onBack}
          >
            VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
}