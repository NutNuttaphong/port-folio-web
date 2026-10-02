import { useState } from "react";
import { X } from "lucide-react";

export function TagInput({ tags: propTags, onChange, placeholder = "พิมพ์ Tag แล้วกด Enter..." }) {
  const [internalTags, setInternalTags] = useState([]);
  const [input, setInput] = useState("");

  // รองรับทั้งแบบส่ง props มา (Controlled) หรือใช้ state ภายใน (Uncontrolled)
  const isControlled = Array.isArray(propTags) && typeof onChange === "function";
  const currentTags = isControlled ? propTags : internalTags;

  const updateTags = (newTags) => {
    if (isControlled) {
      onChange(newTags);
    } else {
      setInternalTags(newTags);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const cleanValue = input.replace(/,/g, "").trim();
      if (cleanValue && !currentTags.includes(cleanValue)) {
        updateTags([...currentTags, cleanValue]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && currentTags.length > 0) {
      updateTags(currentTags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove) => {
    updateTags(currentTags.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 p-2.5 min-h-[46px] bg-white border border-slate-300 dark:border-slate-700 rounded-xl focus-within:ring-2 focus-within:ring-teal-400 focus-within:border-teal-400 transition-all shadow-xs">
        {currentTags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30 rounded-full text-xs font-medium tracking-wide shadow-xs transition-all hover:border-teal-400 animate-fadeIn"
          >
            <span className="font-mono text-[11px]">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
            >
              <X size={10} strokeWidth={2.5} />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={currentTags.length === 0 ? placeholder : "เพิ่ม Tag อีก..."}
          className="flex-1 min-w-[130px] bg-transparent text-sm text-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none py-1 px-1"
        />
      </div>

      {/* <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 flex items-center gap-1">
        <span>💡</span> พิมพ์ข้อความแล้วกด <strong className="text-slate-600 dark:text-slate-300">Enter</strong> หรือ <strong className="text-slate-600 dark:text-slate-300">Comma (,)</strong> เพื่อเพิ่ม Tag
      </p> */}
    </div>
  );
}

export default TagInput;
