import React, { createContext, useContext, useEffect, useRef } from "react";

type KeyHandler = (e: KeyboardEvent) => void;

interface KeypadContextProps {
  subscribe: (handler: KeyHandler) => () => void;
}

const KeypadContext = createContext<KeypadContextProps | undefined>(undefined);

export function KeypadProvider({ children }: { children: React.ReactNode }) {
  const handlers = useRef<Set<KeyHandler>>(new Set());

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      handlers.current.forEach((h) => h(e));
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const subscribe = (handler: KeyHandler) => {
    handlers.current.add(handler);
    return () => handlers.current.delete(handler);
  };

  return (
    <KeypadContext.Provider value={{ subscribe }}>
      {children}
    </KeypadContext.Provider>
  );
}

export function useKeypad(handler: KeyHandler) {
  const ctx = useContext(KeypadContext);
  useEffect(() => {
    if (!ctx) return;
    return ctx.subscribe(handler);
  }, [ctx, handler]);
}