// InputModeToggle — global toggle between Keyboard and Tap (tablet) mode
// Displayed in the header of every page
import { useInputMode } from "@/hooks/useInputMode";

export default function InputModeToggle() {
  const { mode, toggle } = useInputMode();
  const isTap = mode === "tap";

  return (
    <button
      onClick={toggle}
      title={isTap ? "Switch to Keyboard Mode" : "Switch to Tap Mode (Tablet)"}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 select-none"
      style={{
        backgroundColor: isTap ? "#7C3AED" : "#F3F4F6",
        color: isTap ? "#FFFFFF" : "#6B7280",
        border: isTap ? "none" : "1px solid #E5E7EB",
        boxShadow: isTap ? "0 2px 8px rgba(124,58,237,0.3)" : "none",
      }}
    >
      <span className="text-base">{isTap ? "👆" : "⌨️"}</span>
      <span className="hidden sm:inline">{isTap ? "Tap Mode" : "Keyboard"}</span>
    </button>
  );
}
