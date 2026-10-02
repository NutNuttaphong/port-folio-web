import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1329] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="text-2xl font-bold text-white text-start tracking-wider">
            Port<span className="text-teal-400">Dev</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed text-start">
            Full-Stack Software Engineer — มุ่งมั่นสร้างสรรค์เว็บแอปพลิเคชันและสถาปัตยกรรมระบบที่เสถียร รวดเร็ว และตอบโจทย์ธุรกิจ
          </p>
          
          {/* Social Icons (ใช้ SVG ตรงๆ ไม่พึ่ง library เพื่อป้องกัน Error) */}
          <div className="flex items-center gap-3 pt-2">
            {/* Facebook */}
            <a href="https://github.com/NutNuttaphong" target="_blank" rel="noopener noreferrer" className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-teal-500 hover:text-white transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a href="mailto:nuttphong.sp@gmail.com" className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-teal-500 hover:text-white transition">
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider text-start text-sm">เมนูนำทาง</h4>
          <ul className="space-y-2 text-start text-sm">
            <li><Link to="/portfolio" className="hover:text-teal-400 transition">Portfolio</Link></li>
            <li><Link to="/about-us" className="hover:text-teal-400 transition">About Us</Link></li>
            <li><Link to="/event/contacts" className="hover:text-teal-400 transition">Contact Me</Link></li>
          </ul>
        </div>

        {/* Services / Expertise */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider text-start text-sm">ความเชี่ยวชาญ (Expertise)</h4>
          <ul className="space-y-2 text-start text-sm text-slate-400">
            <li className="hover:text-slate-200 transition">Full-Stack Web Architecture</li>
            <li className="hover:text-slate-200 transition">React 18 &amp; Modern UI/UX</li>
            <li className="hover:text-slate-200 transition">NestJS &amp; RESTful APIs</li>
            <li className="hover:text-slate-200 transition">MongoDB &amp; NoSQL Database</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wider text-start text-sm">ติดต่อเรา</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-teal-400 shrink-0" />
              <span>Bangkok, Thailand</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-teal-400 shrink-0" />
              <span>+66 (0) 61 267 9518</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-teal-400 shrink-0" />
              <span>nuttphong.sp@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/5 bg-[#080d1c] py-6 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center mx-auto gap-4">
        <p>© 2026 Nuttaphong. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}