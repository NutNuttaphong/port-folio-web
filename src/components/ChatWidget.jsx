import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sparkles,
  User,
  Check,
  CheckCheck,
  FileText,
  ArrowLeft,
} from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState("chat"); // "chat" | "form"
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sessionId, setSessionId] = useState("");

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formError, setFormError] = useState("");

  const messagesEndRef = useRef(null);

  // 1. กำหนด Session ID ต่อเนื่อง (เก็บใน localStorage)
  useEffect(() => {
    let currentId = localStorage.getItem("chat_session_id");
    if (!currentId) {
      currentId = `hr-${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem("chat_session_id", currentId);
    }
    setSessionId(currentId);

    const savedName = localStorage.getItem("chat_user_name");
    const savedContact = localStorage.getItem("chat_user_contact");
    if (savedName) setFormName(savedName);
    if (savedContact) setFormContact(savedContact);
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
    if (isOpen && viewMode === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, viewMode]);

  // 4. ส่งข้อความแชทปกติ
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

  // 5. ส่งแบบฟอร์มข้อมูลติดต่อกลับ
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formName.trim()) {
      setFormError("กรุณากรอกชื่อของคุณ หรือชื่อบริษัท/องค์กร");
      return;
    }
    if (!formContact.trim()) {
      setFormError("กรุณากรอกเบอร์โทรศัพท์, อีเมล หรือ LINE ID");
      return;
    }
    if (!formDetails.trim()) {
      setFormError("กรุณาระบุรายละเอียดงานหรือข้อความที่ต้องการคุย");
      return;
    }

    localStorage.setItem("chat_user_name", formName.trim());
    localStorage.setItem("chat_user_contact", formContact.trim());

    const formattedMessage = `📋 [แบบฟอร์มฝากข้อมูลติดต่อกลับ]\n👤 ผู้ติดต่อ: ${formName.trim()}\n📞 ช่องทางติดต่อ: ${formContact.trim()}\n💬 รายละเอียด: ${formDetails.trim()}`;

    const now = new Date().toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      sender: "user",
      text: formattedMessage,
      createdAt: now,
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setIsSending(true);
    setViewMode("chat");
    setFormDetails("");
    setFormError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${API_URL}/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: formattedMessage,
          honeypot: honeypot || undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const baseMsgs = Array.isArray(data.messages) ? data.messages : [];

        const botAckMsg = {
          id: `bot-ack-${Date.now()}`,
          sender: "nuttaphong",
          text: `✅ ได้รับข้อมูลติดต่อกลับเรียบร้อยแล้วครับ! ข้อมูลถูกส่งตรงเข้า LINE ของณัฐพงษ์แล้ว ผมจะรีบติดต่อกลับโดยเร็วที่สุดครับ 🙏`,
          createdAt: now,
        };

        setMessages([...baseMsgs, botAckMsg]);
      }
    } catch (err) {
      console.error("Error sending contact form:", err);
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
        <div className="relative flex flex-col w-[340px] sm:w-[400px] h-[540px] rounded-3xl border border-teal-500/30 bg-[#091124]/95 text-white shadow-2xl shadow-black/90 backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 overflow-hidden">
          
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

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5">
              {viewMode === "chat" ? (
                <button
                  onClick={() => {
                    setViewMode("form");
                    setFormError("");
                  }}
                  className="flex items-center gap-1 rounded-full bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 text-[10px] font-bold px-2.5 py-1 border border-teal-500/30 transition cursor-pointer"
                  title="ฝากข้อมูลติดต่อกลับ"
                >
                  <FileText size={12} />
                  <span>ฝากข้อมูล</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setViewMode("chat");
                    setFormError("");
                  }}
                  className="flex items-center gap-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold px-2.5 py-1 border border-white/10 transition cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>กลับไปแชท</span>
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer ml-0.5"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: CHAT */}
          {viewMode === "chat" && (
            <>
              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-700">
                {/* ข้อความต้อนรับอัตโนมัติ */}
                <div className="flex items-start gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center text-teal-300 text-xs font-bold shrink-0 mt-0.5 border border-teal-500/30">
                    N
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-800/90 border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 leading-relaxed shadow-sm">
                    <p>👋 สวัสดีครับ! ยินดีต้อนรับ HR &amp; Recruiter ทุกท่านครับ</p>
                    <p className="mt-1 text-slate-300">
                      สนใจตำแหน่งงานหรืออยากชวนคุยโปรเจกต์ พิมพ์คุยในนี้ได้เลยครับ หรือสามารถกดฝากข้อมูลเพื่อให้ผมติดต่อกลับได้ทันทีครับ 🚀
                    </p>

                    {/* Quick Action Button ฝากข้อมูลติดต่อกลับ */}
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode("form");
                        setFormError("");
                      }}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 text-teal-300 font-bold text-[11px] py-2 px-3 border border-teal-500/40 transition active:scale-95 cursor-pointer shadow-sm"
                    >
                      <FileText size={13} className="text-teal-400" />
                      <span>📋 กดที่นี่เพื่อฝากข้อมูลให้ณัฐพงษ์ติดต่อกลับ</span>
                    </button>

                    <span className="block text-[9px] text-slate-500 text-right mt-1.5 font-mono">
                      บอทต้อนรับ
                    </span>
                  </div>
                </div>

                {/* รายการข้อความที่สนทนากัน */}
                {messages.map((msg, index) => {
                  const isMe = msg.sender === "user";
                  const isContactCard = msg.text?.includes("📋 [แบบฟอร์มฝากข้อมูลติดต่อกลับ]");

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
                        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-md ${
                          isMe
                            ? isContactCard
                              ? "rounded-tr-sm bg-gradient-to-br from-teal-950/90 to-slate-900 border border-teal-400/50 text-slate-100"
                              : "rounded-tr-sm bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-medium"
                            : "rounded-tl-sm bg-slate-800/90 text-slate-200 border border-teal-500/30"
                        }`}
                      >
                        {isContactCard ? (
                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-center gap-1.5 text-teal-300 font-bold border-b border-teal-500/20 pb-1 text-[11px]">
                              <FileText size={13} />
                              <span>แบบฟอร์มฝากข้อมูลติดต่อกลับ</span>
                            </div>
                            <p className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-200">
                              {msg.text.replace("📋 [แบบฟอร์มฝากข้อมูลติดต่อกลับ]\n", "")}
                            </p>
                          </div>
                        ) : (
                          <p className="break-words whitespace-pre-wrap">{msg.text}</p>
                        )}

                        <div
                          className={`flex items-center justify-end gap-1 text-[9px] mt-1.5 font-mono ${
                            isMe ? (isContactCard ? "text-teal-400/70" : "text-slate-800/70") : "text-slate-500"
                          }`}
                        >
                          <span>{msg.createdAt || "ตอนนี้"}</span>
                          {isMe && <CheckCheck size={11} className={isContactCard ? "text-teal-300" : "text-slate-900"} />}
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
            </>
          )}

          {/* VIEW MODE 2: CONTACT FORM */}
          {viewMode === "form" && (
            <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-[#091124]">
              {/* Form Title & Intro */}
              <div className="mb-3.5">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs mb-1">
                  <FileText size={15} />
                  <span>แบบฟอร์มฝากข้อมูลติดต่อกลับ</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  กรอกข้อมูลด้านล่างนี้ ระบบจะจัดส่งรายละเอียดตรงเข้า <span className="text-emerald-400 font-semibold">LINE ของคุณณัฐพงษ์</span> ทันทีครับ
                </p>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleFormSubmit} className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Field 1: Name / Company */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      ชื่อผู้ติดต่อ / บริษัท หรือ หน่วยงาน <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => {
                        setFormName(e.target.value);
                        if (formError) setFormError("");
                      }}
                      placeholder="เช่น คุณสมชาย (บริษัท ABC Tech)"
                      maxLength={100}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
                    />
                  </div>

                  {/* Field 2: Contact Info */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      เบอร์โทรศัพท์ / อีเมล / LINE ID <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formContact}
                      onChange={(e) => {
                        setFormContact(e.target.value);
                        if (formError) setFormError("");
                      }}
                      placeholder="เช่น 081-xxx-xxxx หรือ email@company.com"
                      maxLength={100}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
                    />
                  </div>

                  {/* Field 3: Job details / Message */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      รายละเอียดงาน / ข้อความถึงณัฐพงษ์ <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      value={formDetails}
                      onChange={(e) => {
                        setFormDetails(e.target.value);
                        if (formError) setFormError("");
                      }}
                      rows={3}
                      placeholder="ระบุตำแหน่งงาน, เทคโนโลยีที่ใช้ หรือช่วงเวลาที่สะดวกให้ติดต่อกลับ..."
                      maxLength={500}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {formError && (
                    <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-2 text-[11px] text-rose-300">
                      ⚠️ {formError}
                    </div>
                  )}
                </div>

                {/* Form Buttons */}
                <div className="space-y-2 pt-2 border-t border-white/10 mt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 py-2.5 px-4 text-xs font-bold text-slate-950 transition hover:opacity-90 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-teal-500/20"
                  >
                    {isSending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>กำลังจัดส่งข้อมูลเข้า LINE...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>ส่งข้อมูลติดต่อกลับ (เด้งเข้า LINE)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("chat");
                      setFormError("");
                    }}
                    className="w-full py-1.5 text-center text-[11px] text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  >
                    ยกเลิก / กลับไปหน้าแชทสด
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
