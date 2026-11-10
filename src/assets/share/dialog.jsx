import { useEffect } from "react";
import { Construction, X } from "lucide-react";

export const Dialog = ({
  isOpen,
  onClose,
  title = "Project Under Development",
  message = "Features and details for this project are currently under active development and will be available soon. Thank you for your interest!",
}) => {
  const displayTitle = title;
  const displayMessage = message;
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-b from-[#0f1b3b]/95 via-[#0b132b]/95 to-[#060a17]/95 p-6 text-center text-white shadow-2xl shadow-teal-500/10 backdrop-blur-xl"
      >
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -top-12 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-teal-500/20 blur-2xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 via-teal-500/20 to-blue-500/20 border border-teal-500/30 shadow-inner">
          <Construction className="h-7 w-7 text-teal-400 animate-pulse" />
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-300 border border-teal-500/20 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          Under Development
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-white mb-2">
          {displayTitle}
        </h3>

        {/* Message */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {displayMessage}
        </p>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-w-[140px] rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold px-6 py-2.5 shadow-lg shadow-teal-500/25 transition-all duration-200 hover:shadow-teal-500/40 active:scale-95 cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
