import { useState } from 'react';
import { Award, X } from 'lucide-react';

import slideImage1 from '../../../images/image/ai1.png';
import slideImage2 from '../../../images/image/ai2.png';
import slideImage3 from '../../../images/image/ai3.png';
import slideImage4 from '../../../images/image/ai4.png';
import slideImage5 from '../../../images/image/ai5.png';
import slideImage6 from '../../../images/image/ai6.png';
import slideImage7 from '../../../images/image/react.png';

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 1,
      title: 'ReactJS for Beginners — Modern Web Architecture',
      image: slideImage7,
      issuer: 'Frontend Development',
    },
    {
      id: 2,
      title: 'Basic to Intermediate AI: Practical AI Skills for Learning, Working & Earning',
      image: slideImage1,
      issuer: 'AI Certification',
    },
    {
      id: 3,
      title: 'Fundamental Principles of Artificial Intelligence',
      image: slideImage3,
      issuer: 'AI Core Foundations',
    },
    {
      id: 4,
      title: 'AI for Lifelong Learning and Self-Development',
      image: slideImage4,
      issuer: 'AI Applied Practices',
    },
    {
      id: 5,
      title: 'Data and Database Fundamentals for AI Systems',
      image: slideImage5,
      issuer: 'Data & Systems',
    },
    {
      id: 6,
      title: 'AI-Driven Workflow and Process Optimization',
      image: slideImage6,
      issuer: 'Workflow Automation',
    },
    {
      id: 7,
      title: 'Ethics, Security, and the Future of AI',
      image: slideImage2,
      issuer: 'AI Governance & Safety',
    },
  ];

  return (
    <section id="credentials" className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12">
      {/* Top Tag & Header */}
      <div className="text-left mb-6">
        <span className="text-[11px] font-mono font-bold tracking-wider text-teal-400 uppercase block mb-1.5">
          CERTIFIED KNOWLEDGE
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Certificates &amp; Credentials
        </h2>
      </div>

      {/* 3-Column Grid of Horizontal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1326]/90 shadow-sm p-3.5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-teal-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/5 flex items-center gap-3.5"
          >
            {/* Image Thumbnail on Left */}
            <div className="relative w-20 h-14 sm:w-24 sm:h-16 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Content on Right */}
            <div className="min-w-0 flex-1 text-left">
              <span className="text-[11px] font-mono text-teal-400 font-bold block mb-1 truncate">
                {cert.issuer}
              </span>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                {cert.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full rounded-2xl border border-white/20 bg-slate-900 p-5 text-white shadow-2xl"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full max-h-[70vh] object-contain rounded-xl mb-3"
            />
            <div className="text-center">
              <span className="text-xs font-mono text-teal-400 font-bold block mb-1">
                {selectedCert.issuer}
              </span>
              <h3 className="text-sm sm:text-base font-bold">
                {selectedCert.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
