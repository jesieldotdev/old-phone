import { useState } from "react";
import { Star, User, Phone, Mail } from "lucide-react";
import { useKeypad } from "../contexts/KeypadContext";

interface Contact {
  name: string;
  number: string;
  favorite: boolean;
}

interface ContactDetailProps {
  selectedContact: Contact | null;
  handleCall: () => void;
  handleSMS: () => void;
}

export default function ContactDetail({ selectedContact, handleCall, handleSMS }: ContactDetailProps) {
  const [selectedBtn, setSelectedBtn] = useState<0 | 1>(0);

  useKeypad((e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setSelectedBtn((prev) => (prev === 0 ? 1 : 0));
    }
    if (e.key === "Enter") {
      if (selectedBtn === 0) handleCall();
      if (selectedBtn === 1) handleSMS();
    }
  });

  if (!selectedContact) return null;
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between px-4 pt-2 text-green-700 text-lg">
        <div className="flex items-center flex"><Phone className="h-4 "/><span> Contato</span></div>
        {selectedContact.favorite && <Star className="h-5  fill-current" />}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-4">
          <User className="h-12 w-12 mx-auto mb-2 text-green-700" />
          <div className="text-2xl font-bold text-green-800 mb-1">
            {selectedContact.name}
          </div>
          <div className="text-lg text-green-700">
            {selectedContact.number}
          </div>
        </div>
        <div className="flex gap-4 ">
          <button
            onClick={handleCall}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded text-xs transition `}
          >
            <Phone className="h-5" />
            <span>Ligar</span>
          </button>
          <button
            onClick={handleSMS}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded text-xs transition ${selectedBtn === 1 ? 'bg-blue-300 text-blue-800' : 'bg-blue-200 text-blue-700 hover:bg-blue-300'}`}
          >
            <Mail className="h-5" />
            <span>SMS</span>
          </button>
        </div>
      </div>
      <div className="text-xs text-green-600 text-center">
        Voltar: ← • Ligar: Verde • SMS: Azul
      </div>
    </div>
  );
}