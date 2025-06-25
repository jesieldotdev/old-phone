import { BatteryFull } from "lucide-react";

export default function Menu({ time, menuItems, selected, active, itemRefs, setSelected, handleSelect }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between px-4 pt-2 text-green-700 text-xl">
        <span>{time}</span>
        <span><BatteryFull className="h-6"/></span>
      </div>
      <div className="flex-1 flex flex-col gap-2 mt-4 pl-6 pr-2 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
        {menuItems &&  menuItems.length &&  menuItems.map((item, idx) => (
          <div
            key={item}
            ref={el => { itemRefs.current[idx] = el; }}
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