import { useState, useEffect } from "react";
import {
  Download,
  Printer,
  FileText,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Eye,
} from "lucide-react";

export default function PdfViewerPage() {
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState("document"); // 'document' (canvas) or 'native' (iframe)

  useEffect(() => {
    document.title = "Nuttaphong_Samiphak_CV.pdf";
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Nuttaphong_Samiphak_CV.pdf";
    link.download = "Nuttaphong_Samiphak_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    if (window.opener) {
      window.close();
    } else {
      window.location.href = "/cv-preview";
    }
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 15, 175));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 15, 60));
  const resetZoom = () => setZoom(100);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#2b2d30] text-slate-100 overflow-hidden select-none">
      {/* ======================================================== */}
      {/* TOP PDF VIEWER TOOLBAR                                   */}
      {/* ======================================================== */}
      <header className="h-13 bg-[#1e2023] border-b border-black/40 px-3 sm:px-5 flex items-center justify-between text-xs shadow-md z-30 flex-shrink-0">
        {/* Left: Document details */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={handleClose}
            title="ปิดหน้านี้ (Close Tab)"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="p-1 rounded bg-teal-500/20 text-teal-400 flex-shrink-0">
            <FileText size={15} />
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-slate-100 truncate text-xs sm:text-sm">
              Nuttaphong_Samiphak_CV.pdf
            </span>
            <span className="hidden sm:inline-block rounded bg-black/40 text-slate-400 text-[10px] px-1.5 py-0.5 font-mono">
              1 / 1
            </span>
          </div>
        </div>

        {/* Center: Zoom & View controls */}
        <div className="hidden sm:flex items-center gap-1.5 bg-black/30 rounded-lg p-0.5 border border-white/5">
          <button
            type="button"
            onClick={zoomOut}
            title="ย่อขนาด (Zoom Out)"
            className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ZoomOut size={14} />
          </button>
          <button
            type="button"
            onClick={resetZoom}
            title="รีเซ็ตขนาด 100%"
            className="px-2 py-0.5 text-[11px] font-mono text-slate-300 hover:text-white transition cursor-pointer"
          >
            {zoom}%
          </button>
          <button
            type="button"
            onClick={zoomIn}
            title="ขยายขนาด (Zoom In)"
            className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ZoomIn size={14} />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="hidden md:flex items-center bg-black/30 rounded-lg p-0.5 border border-white/5 text-[11px]">
            <button
              type="button"
              onClick={() => setViewMode("document")}
              className={`px-2.5 py-1 rounded transition cursor-pointer ${
                viewMode === "document"
                  ? "bg-teal-500/20 text-teal-300 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Document View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("native")}
              className={`px-2.5 py-1 rounded transition cursor-pointer ${
                viewMode === "native"
                  ? "bg-teal-500/20 text-teal-300 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Native Iframe
            </button>
          </div>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            title="พิมพ์เอกสาร (Print)"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition cursor-pointer text-xs"
          >
            <Printer size={13} />
            <span>พิมพ์</span>
          </button>

          {/* Direct File Link */}
          <a
            href="/Nuttaphong_Samiphak_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="เปิดไฟล์ Raw PDF โดยตรง"
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition cursor-pointer text-xs"
          >
            <ExternalLink size={13} />
            <span>Raw PDF</span>
          </a>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
          >
            <Download size={14} />
            <span>ดาวน์โหลด PDF</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* MAIN PDF WORKSPACE                                       */}
      {/* ======================================================== */}
      <main className="flex-1 w-full h-[calc(100vh-52px)] overflow-auto bg-[#323639] p-4 sm:p-8 flex justify-center items-start">
        {viewMode === "document" ? (
          <div
            style={{ width: `${zoom}%`, maxWidth: "860px" }}
            className="transition-all duration-200 origin-top shadow-[0_4px_30px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden bg-white mx-auto my-2"
          >
            <img
              src="/cv-preview.png"
              alt="Nuttaphong Samipak CV (PDF)"
              className="w-full h-auto block select-none"
              loading="eager"
            />
          </div>
        ) : (
          <div className="w-full h-full max-w-5xl rounded-lg overflow-hidden shadow-2xl bg-white border border-white/10">
            <iframe
              src="/Nuttaphong_Samiphak_CV.pdf#toolbar=1&navpanes=0&view=FitH"
              title="Nuttaphong Samipak CV PDF"
              className="w-full h-full border-0 block"
            />
          </div>
        )}
      </main>
    </div>
  );
}
