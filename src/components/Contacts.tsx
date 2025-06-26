import { Star, User, Phone } from "lucide-react";

interface Contact {
  name: string;
  number: string;
  favorite: boolean;
}

interface ContactsProps {
  contactsList: Contact[];
  contactSelected: number;
  contactRefs: React.MutableRefObject<any[]>;
  setContactSelected: (idx: number) => void;
  handleSelect: () => void;
}

export default function Contacts({
  contactsList,
  contactSelected,
  contactRefs,
  setContactSelected,
  handleSelect,
}: ContactsProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between px-4 pt-2 text-green-700 text-lg">
        <div className="flex gap-2 items-center"><Phone className="h-5"/><span className="font-semibold  text-2xl"> Contatos</span></div>
        <span className="font-bold">{contactsList.length}</span>
      </div>
      <div className="flex-1 flex flex-col gap-1 mt-2 px-2 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
        {contactsList.map((contact, idx) => (
          <div
            key={contact.name}
            ref={el => { contactRefs.current[idx] = el; }}
            className={`text-lg font-normal px-2 py-1 rounded cursor-pointer transition flex items-center justify-between
              ${contactSelected === idx ? "bg-blue-200 text-blue-900" : "text-blue-900 opacity-70"}
            `}
            onClick={() => { setContactSelected(idx); handleSelect(); }}
            tabIndex={0}
          >
            <div className="flex items-center gap-2">
              <span className="truncate">{contact.name}</span>
            </div>
            <Phone className="h-3 opacity-60" />
          </div>
        ))}
      </div>
      <div className=" text-lg font-bold text-green-600 text-center mt-1">
        OK: Ver • ↑↓: Navegar
      </div>
    </div>
  );
}