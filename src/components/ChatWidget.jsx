import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2, Sparkles, User, Check, CheckCheck } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sessionId, setSessionId] = useState("");

  const messagesEndRef = useRef(null);

  // 1. กำหนด Session ID ต่อเนื่อง (เก็บใน localStorage)
  useEffect(() => {
    let currentId = localStorage.getItem("chat_session_id");
    if (!currentId) {
      currentId = `hr-${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem("chat_session_id", currentId);
    }
    setSessionId(currentId);
  }, []);

  // 2. ดึงประวัติแชทและเปิดระบบ Polling ตรวจสอบข้อความตอบกลับจากณัฐพงษ์ทุก 3.5 วินาที
  useEffect(() => {
    if (!sessionId || !isOpen) return;

    const fetchMessages = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/contact/messages/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.messages)) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        // silent fail on polling
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3500);
    return () => clearInterval(interval);
  }, [sessionId, isOpen]);

  // 3. เลื่อนหน้าจอลงล่างสุดอัตโนมัติเมื่อมีข้อความใหม่
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // 4. ส่งข้อความ
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    const textToSend = inputText.trim();
    if (!textToSend || isSending) return;

    // 🍯 Anti-bot honeypot check
    if (honeypot) {
      setInputText("");
      return;
    }

    const now = new Date().toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      sender: "user",
      text: textToSend,
      createdAt: now,
    };

    // แสดงบนหน้าจอทันที (Optimistic UI)
    setMessages((prev) => [...prev, optimisticMsg]);
    setInputText("");
    setIsSending(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${API_URL}/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: textToSend,
          honeypot: honeypot || undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. ปุ่มลอยเปิดแชท (Floating Button) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 p-3.5 sm:px-5 sm:py-3.5 text-slate-950 font-bold shadow-xl shadow-teal-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-400/40 active:scale-95 cursor-pointer"
          aria-label="Open chat"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageSquare size={20} className="text-slate-950" />
          <span className="hidden sm:inline text-xs tracking-wider uppercase font-extrabold">
            Chat with Me 💬
          </span>
        </button>
      )}

      {/* 2. หน้าต่างแชท (Real Chat Window UI) */}
      {isOpen && (
        <div className="relative flex flex-col w-[340px] sm:w-[380px] h-[520px] rounded-3xl border border-teal-500/30 bg-[#091124]/95 text-white shadow-2xl shadow-black/90 backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#0d172e]">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 p-0.5">
                <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-teal-300 text-xs">
                  N
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white tracking-wide">Nuttaphong S.</h4>
                  <span className="rounded bg-teal-500/20 px-1 py-0.2 text-[9px] font-mono text-teal-300 border border-teal-500/30">
                    DEV
                  </span>
                </div>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="animate-pulse">●</span> ออนไลน์ • ส่งตรงเข้า LINE ทันที
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-slate-500 hidden sm:inline mr-1">
                #{sessionId}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-700">
            {/* ข้อความต้อนรับอัตโนมัติจากณัฐพงษ์ */}
            <div className="flex items-start gap-2.5">
              <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center text-teal-300 text-xs font-bold shrink-0 mt-0.5 border border-teal-500/30">
                N
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-800/90 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 leading-relaxed shadow-sm">
                <p>👋 สวัสดีครับ! ยินดีต้อนรับ HR &amp; Recruiter ทุกท่านครับ</p>
                <p className="mt-1 text-slate-300">
                  สนใจตำแหน่งงานหรืออยากชวนคุยโปรเจกต์ พิมพ์ข้อความไว้ตรงนี้ได้เลยครับ ข้อความจะส่งตรงเข้า LINE ของผมทันที และผมสามารถตอบกลับเข้ามาในห้องนี้ได้ครับ 🚀
                </p>
                <span className="block text-[9px] text-slate-500 text-right mt-1 font-mono">
                  บอทต้อนรับ
                </span>
              </div>
            </div>

            {/* รายการข้อความที่สนทนากัน */}
            {messages.map((msg, index) => {
              const isMe = msg.sender === "user";
              return (
                <div
                  key={msg.id || index}
                  className={`flex items-start gap-2 ${isMe ? "justify-end" : "justify-start"}`}
                >
                  {!isMe && (
                    <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center text-teal-300 text-xs font-bold shrink-0 mt-0.5 border border-teal-500/30">
                      N
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-md ${
                      isMe
                        ? "rounded-tr-sm bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-medium"
                        : "rounded-tl-sm bg-slate-800/90 text-slate-200 border border-teal-500/30"
                    }`}
                  >
                    <p className="break-words whitespace-pre-wrap">{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 text-[9px] mt-1 font-mono ${
                        isMe ? "text-slate-800/70" : "text-slate-500"
                      }`}
                    >
                      <span>{msg.createdAt || "ตอนนี้"}</span>
                      {isMe && <CheckCheck size={11} className="text-slate-900" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* แสดงสถานะเมื่อกำลังส่ง */}
            {isSending && (
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-teal-500/20 px-3 py-1.5 text-[11px] text-teal-300 flex items-center gap-1.5 font-mono">
                  <Loader2 size={12} className="animate-spin" />
                  <span>กำลังส่งเข้า LINE...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 🍯 Hidden Honeypot Input */}
          <input
            type="text"
            name="user_website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Bottom Chat Input Bar */}
          <form
            onSubmit={handleSend}
            className="border-t border-white/10 p-3 bg-[#0d172e] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={500}
              placeholder="พิมพ์ข้อความคุยกับณัฐพงษ์..."
              className="flex-1 rounded-xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="h-9 w-9 rounded-xl bg-teal-400 flex items-center justify-center text-slate-950 transition hover:bg-teal-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-teal-500/20 shrink-0"
              aria-label="Send message"
            >
              {isSending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
