import { useEffect } from "react";

type HandleKey = (dir: "up" | "down") => void;
type HandleSelect = () => void;
type HandleBack = () => void;

export function useMenuNavigation(
  screen: string,
  handleKey: HandleKey,
  handleSelect: HandleSelect,
  handleBack: HandleBack,
  dialNumber: string,
  setDialNumber: (n: string) => void,
  beep: () => void
) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (screen === "dialer" && /^[0-9*#]$/.test(e.key)) {
        setDialNumber(dialNumber + e.key);
        beep();
      }
      if (e.key === "ArrowUp") handleKey("up");
      if (e.key === "ArrowDown") handleKey("down");
      if (e.key === "Enter") handleSelect();
      if (e.key === "Escape") handleBack();
      if (screen === "dialer" && (e.key === "Backspace" || e.key === "Delete")) {
        setDialNumber(dialNumber.slice(0, -1));
        beep();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [screen, handleKey, handleSelect, handleBack, dialNumber, setDialNumber, beep]);
}