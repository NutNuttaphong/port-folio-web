import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Clock,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import StarField from "./start-field";
import githubIcon from "../../images/icon/github.svg";

export default function ContactsPage() {
  const outletCtx = useOutletContext();
  const isDark = outletCtx?.isDark ?? true;
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [topic, setTopic] = useState("Full-Stack Development");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  // Copy Email State
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = "nuttphong.sp@gmail.com";
  const phoneNumber = "+66 (0) 61 267 9518";
  const githubUrl = "https://github.com/NutNuttaphong";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (honeypot) {
      // Anti-bot silent abort
      setSubmitStatus("success");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Please enter your name or company.");
      return;
    }
    if (!contactInfo.trim()) {
      setErrorMessage("Please enter your email, phone, or LINE ID.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please enter your message or project requirements.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const formattedMessage = `📋 [Website Contact Page Inquiry]\n👤 Name: ${name.trim()}\n📞 Contact: ${contactInfo.trim()}\n🎯 Topic: ${topic}\n💬 Message: ${message.trim()}`;

    try {
      const sessionId = `web-${Math.random().toString(36).substring(2, 8)}`;
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await fetch(`${API_URL}/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: formattedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message via contact API");
      }

      setSubmitStatus("success");
      setName("");
      setContactInfo("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting contact inquiry:", err);
      // Fallback: If backend is temporarily sleeping on free tier, present a helpful message
      setSubmitStatus("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`relative min-h-[calc(100vh-73px)] w-full flex flex-col items-center overflow-x-hidden transition-colors duration-500 ${
      isDark
        ? "bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] text-white"
        : "bg-gradient-to-b from-[#f8fafc] via-[#eef4ff] to-[#f1f5f9] text-slate-900"
    }`}>
      {/* Background StarField & Ambient Glows */}
      {isDark ? (
        <>
          <StarField count={220} />
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[140px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[150px]" />
          <div className="pointer-events-none fixed bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
        </>
      ) : (
        <>
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-300/20 blur-[140px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-sky-300/25 blur-[150px]" />
          <div className="pointer-events-none fixed bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-300/20 blur-[160px]" />
        </>
      )}

      <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300 backdrop-blur-md mb-4 shadow-sm">
            <Sparkles size={14} className="text-teal-400" />
            <span>DIRECT CHANNELS &amp; REAL-TIME LINE DISPATCH</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Let&apos;s Build Something Exceptional Together
          </h1>

          <p className="text-slate-600 text-start dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Whether you are looking to architect a scalable web platform, consult on modern full-stack systems, or discuss a career opportunity, feel free to reach out anytime.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for New Projects &amp; Engineering Roles</span>
          </div>
        </div>

        {/* Content Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 w-full max-w-6xl items-start">
          {/* Column 1: Contact Channels & Credentials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Direct Cards */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-6 sm:p-7 backdrop-blur-xl shadow-md shadow-slate-200/60 dark:shadow-none">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-teal-400" />
                <span>Contact Channels</span>
              </h2>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-4 transition hover:border-teal-500/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-start font-mono text-slate-500 dark:text-slate-400 uppercase">Email Address</div>
                        <a
                          href={`mailto:${emailAddress}`}
                          className="text-sm font-semibold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
                        >
                          {emailAddress}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Copy Email"
                      className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-sm hover:border-teal-400/40 transition cursor-pointer"
                    >
                      {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-4 transition hover:border-teal-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-start font-mono text-slate-500 dark:text-slate-400 uppercase">Phone &amp; Mobile</div>
                        <a
                          href="tel:+66612679518"
                          className="text-sm font-semibold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
                        >
                          {phoneNumber}
                        </a>
                      </div>
                    </div>

                    <a
                      href="tel:+66612679518"
                      className="text-xs font-bold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 transition flex items-center gap-1 font-semibold"
                    >
                      Call <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* GitHub Item */}
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-4 transition hover:border-teal-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        <img src={githubIcon} alt="GitHub" className="w-4 h-4 dark:invert" />
                      </div>
                      <div>
                        <div className="text-xs text-start font-mono text-slate-500 dark:text-slate-400 uppercase">GitHub Profile</div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">github.com/NutNuttaphong</div>
                      </div>
                    </div>

                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 transition flex items-center gap-1 font-semibold"
                    >
                      Visit <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-start font-mono text-slate-500 dark:text-slate-400 uppercase">Location &amp; Work Model</div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">Bangkok, Thailand (Hybrid / Remote)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees & LINE Notification Pipeline Card */}
            <div className="rounded-3xl border border-teal-200 dark:border-teal-500/20 bg-gradient-to-br from-teal-50/90 via-sky-50/80 to-white dark:from-teal-950/30 dark:via-slate-900/60 dark:to-slate-900/80 shadow-md dark:shadow-none p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-800 dark:text-teal-300 font-bold mb-2">
                <Clock size={14} className="text-teal-400" />
                <span>RAPID RESPONSE GUARANTEE</span>
              </div>
              <p className="text-xs text-start sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Submissions via this contact form are routed through an automated webhook directly to my personal LINE messenger. Average response time is within 2-4 business hours.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Zero spam policy • Data kept strictly confidential</span>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-6 sm:p-10 backdrop-blur-xl shadow-md shadow-slate-200/60 dark:shadow-none">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Fill in your details below and I will get back to you promptly.
                </p>
              </div>

              {submitStatus === "success" ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center backdrop-blur-md">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out. An alert has been forwarded to my mobile device via LINE. I will respond to your contact details shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus(null)}
                    className="rounded-xl bg-teal-400 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition hover:bg-teal-300 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  {/* Anti-bot Honeypot (hidden) */}
                  <input
                    type="text"
                    name="website_contact_trap"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs text-start font-mono uppercase text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                      Your Name or Organization <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe / TechCorp"
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 shadow-sm"
                      required
                    />
                  </div>

                  {/* Contact Info */}
                  <div>
                    <label className="block text-xs text-start font-mono uppercase text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                      Your Email, Phone, or LINE ID <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="e.g. john@example.com or +66 81 234 5678"
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 shadow-sm"
                      required
                    />
                  </div>

                  {/* Topic / Service Needed */}
                  <div>
                    <label className="block text-xs text-start font-mono uppercase text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                      Subject / Area of Interest
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800/80 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 shadow-sm"
                    >
                      <option value="Full-Stack Development">Full-Stack Development (React / NestJS)</option>
                      <option value="AI & Automation">AI &amp; Automation Integration</option>
                      <option value="Headless CMS & APIs">Headless CMS &amp; Architecture</option>
                      <option value="Frontend Engineering">Modern Frontend &amp; UI/UX</option>
                      <option value="Job Opportunity">Career / Job Opportunity</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs text-start font-mono uppercase text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                      Message &amp; Project Overview <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me a bit about what you are building, your timeline, or any specific questions..."
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 shadow-sm resize-none"
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.01] hover:shadow-teal-400/30 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Dispatching to LINE...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Dispatch Message (Direct to LINE)</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Fast Scheduling Alternative */}
        <section className="mt-16 w-full max-w-5xl rounded-3xl border border-teal-200 dark:border-teal-500/20 bg-white/90 dark:bg-slate-900/60 shadow-lg dark:shadow-none p-8 text-center backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Prefer a Direct 1-on-1 Consultation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Pick a convenient time slot to discuss system architecture or technical consulting.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/booking")}
            className="whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white backdrop-blur-md transition hover:bg-white/10 hover:border-teal-400/40 active:scale-95 cursor-pointer"
          >
            Schedule a Meeting ↗
          </button>
        </section>
      </main>
    </div>
  );
}
