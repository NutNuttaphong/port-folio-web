import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  CheckCircle2,
  FileText,
  X,
  Check,
} from "lucide-react";
import StarField from "./start-field";

export default function CvPreviewPage() {
  const navigate = useNavigate();
  const outletCtx = useOutletContext();
  const isDark = outletCtx?.isDark ?? true;

  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Scroll to top upon mounting
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle keyboard ESC to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isDownloadSuccess) {
        setIsDownloadSuccess(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDownloadSuccess]);

  // Programmatic trigger for downloading PDF
  const handleDownloadPdf = () => {
    setIsDownloading(true);

    try {
      const link = document.createElement("a");
      link.href = "/Nuttaphong_Samiphak_CV.pdf";
      link.download = "Nuttaphong_Samiphak_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Brief delay to trigger success modal
      setTimeout(() => {
        setIsDownloading(false);
        setIsDownloadSuccess(true);
      }, 350);
    } catch (err) {
      console.error("Download failed:", err);
      setIsDownloading(false);
    }
  };

  return (
    <div
      className={`relative min-h-[calc(100vh-73px)] w-full flex flex-col items-center overflow-x-hidden transition-colors duration-500 py-8 px-4 sm:px-6 md:px-8 ${
        isDark
          ? "bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] text-white"
          : "bg-gradient-to-b from-[#f8fafc] via-[#eef4ff] to-[#f1f5f9] text-slate-900"
      }`}
    >
      {/* Background Ambience */}
      {isDark ? (
        <>
          <StarField count={180} />
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[140px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[150px]" />
        </>
      ) : (
        <>
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-300/20 blur-[140px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-sky-300/25 blur-[150px]" />
        </>
      )}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col">
        {/* ======================================================== */}
        {/* TOP TOOLBAR & CONTROLS                                  */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 w-full">
          {/* Back button & Title */}
          <div className="flex items-center gap-3.5 flex-wrap">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition active:scale-95 border cursor-pointer ${
                isDark
                  ? "border-white/10 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white"
                  : "border-slate-200 bg-white/90 hover:bg-slate-100 text-slate-700 hover:text-slate-900 shadow-sm"
              }`}
            >
              <ArrowLeft size={16} />
              <span>ย้อนกลับ</span>
            </button>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                  CV Preview
                </h1>
                <span className="rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wide whitespace-nowrap">
                  1 Page A4
                </span>
                <span className="hidden sm:inline-block rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2.5 py-0.5 tracking-wide whitespace-nowrap">
                  English Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Nuttaphong Samiphak (Front-End Developer)
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
            {/* Open Raw in New Tab */}
            <a
              href="/cv-pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition active:scale-95 border cursor-pointer ${
                isDark
                  ? "border-white/10 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white"
                  : "border-slate-200 bg-white/90 hover:bg-slate-100 text-slate-700 hover:text-slate-900 shadow-sm"
              }`}
              title="เปิดดูไฟล์ในแท็บใหม่"
            >
              <ExternalLink size={15} className="text-teal-500" />
              <span>เปิดแท็บใหม่</span>
            </a>

            {/* PRIMARY DOWNLOAD BUTTON */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-400 hover:bg-teal-300 px-5 py-2 text-xs sm:text-sm font-bold text-slate-950 transition shadow-lg shadow-teal-500/25 active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <Download size={16} className={isDownloading ? "animate-bounce" : ""} />
              <span>{isDownloading ? "กำลังดาวน์โหลด..." : "Download CV (PDF)"}</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PREVIEW DISPLAY CONTAINER                                */}
        {/* ======================================================== */}
        <div className="relative w-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-3 sm:p-6 backdrop-blur-md shadow-2xl flex justify-center items-center">
          <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-slate-300 dark:border-white/15 bg-white">
            <img
              src="/cv-preview.png"
              alt="Nuttaphong Samiphak CV Preview"
              className="w-full h-auto block select-none"
              loading="eager"
            />
          </div>
        </div>

        {/* Bottom helper bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 mt-4 px-2">
          <p>
            ขนาดเอกสาร A4 (Single-page) • แปลภาษาอังกฤษฉบับสมบูรณ์ พร้อมดาวน์โหลดแนบสมัครงาน
          </p>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="text-teal-600 dark:text-teal-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Download size={13} />
            <span>กดดาวน์โหลดไฟล์ PDF ที่นี่</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DIALOG POPUP: 'ทำการ Download สำเร็จ'                    */}
      {/* ======================================================== */}
      {isDownloadSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          {/* Backdrop dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setIsDownloadSuccess(false)}
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-teal-500/40 bg-white dark:bg-[#0c1326] p-6 sm:p-8 shadow-2xl text-center transform transition-all duration-300 scale-100">
            {/* Close Icon button */}
            <button
              type="button"
              onClick={() => setIsDownloadSuccess(false)}
              className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Glowing Success Icon */}
            <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-500 dark:text-teal-400">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-20 animate-ping" />
              <CheckCircle2 size={36} className="relative z-10" />
            </div>

            {/* Success Message Header */}
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              ทำการ Download สำเร็จ
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              ระบบได้ทำการดาวน์โหลดไฟล์ CV ฉบับภาษาอังกฤษ (1 หน้า A4) ลงในเครื่องของคุณเรียบร้อยแล้ว
            </p>

            {/* File Info Card */}
            <div className="mb-6 rounded-2xl border border-teal-500/20 bg-teal-50/60 dark:bg-slate-900/80 p-3.5 text-left flex items-center gap-3">
              <div className="rounded-xl bg-teal-500/20 p-2 text-teal-600 dark:text-teal-400 flex-shrink-0">
                <FileText size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  Nuttaphong_Samiphak_CV.pdf
                </p>
                <p className="text-[11px] text-teal-700 dark:text-teal-300 font-medium">
                  A4 Single-Page • ~1.2 MB • English Edition
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                <Check size={12} />
                พร้อมใช้งาน
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsDownloadSuccess(false)}
                className="w-full sm:flex-1 rounded-xl bg-teal-400 hover:bg-teal-300 py-2.5 px-4 text-xs sm:text-sm font-bold text-slate-950 transition shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
              >
                ตกลง
              </button>

              <a
                href="/cv-pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-4 text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer ${
                  isDark
                    ? "border-white/15 bg-slate-800/80 text-white hover:bg-slate-700"
                    : "border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200"
                }`}
              >
                <ExternalLink size={14} />
                <span>เปิดดูไฟล์</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
