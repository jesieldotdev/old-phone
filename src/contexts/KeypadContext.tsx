import React, { createContext, useContext, useState } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" ;
type ActionKey = "ENTER" | "ESCAPE" | null

interface KeypadContextProps {
  direction: Direction;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
  actionKey: ActionKey | undefined
  setActionKey: React.Dispatch<React.SetStateAction<ActionKey | undefined>>
}

const KeypadContext = createContext<KeypadContextProps | undefined>(undefined);

export function KeypadProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState<Direction>('UP');
  const [actionKey, setActionKey] = useState<ActionKey>();

  return (
    <KeypadContext.Provider value={{ direction, setDirection, setActionKey, actionKey }}>
      {children}
    </KeypadContext.Provider>
  );
}

export function useKeypad() {
  const ctx = useContext(KeypadContext);
  if (!ctx) throw new Error("useKeypad deve ser usado dentro de KeypadProvider");
  return ctx;
}