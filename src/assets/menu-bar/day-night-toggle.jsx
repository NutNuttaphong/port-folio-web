

export default function DayNightToggle({ isDark, setIsDark }) {

  return (
    <div className="flex items-center justify-center p-4">
      {/* กรอบบอดี้หลักด้านนอก (ย่อขนาดเหลือ w-14 h-8) */}
      <div
        onClick={() => setIsDark(!isDark)}
        className="relative w-16 h-8 rounded-full cursor-pointer bg-[#E4E9F2] shadow-[4px_4px_10px_#C5D0E6,-4px_-4px_10px_#FFFFFF] flex items-center p-0.5"
      >
        {/* รางสวิตช์ด้านใน (Inner Track) */}
        <div
          className={`relative w-full h-full rounded-full overflow-hidden transition-all duration-700 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] ${
            isDark
              ? "bg-gradient-to-b from-[#252C3A] to-[#121822]"
              : "bg-gradient-to-b from-[#56A1E7] to-[#3B7CC4]"
          }`}
        >
          {/* เลเยอร์ก้อนเมฆและฉากหลัง (ย่อสัดส่วนให้พอดีกับความสูง 8 (32px)) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* แสงรังสีท้องฟ้าด้านหลัง */}
            <div
              className={`absolute top-0 right-3 w-8 h-full bg-gradient-to-l from-white/20 to-transparent skew-x-12 transition-opacity duration-700 ${isDark ? "opacity-20" : "opacity-60"}`}
            ></div>

            {/* === กลุ่มก้อนเมฆหลัก (Main Cloud Layers) === */}
            <div
              className={`absolute -bottom-4 z-10 left-0 w-full h-6 bg-white rounded-l-full transition-all duration-700 ${isDark ? "translate-y-2" : "translate-y-0"}`}
            ></div>
            <div
              className={`absolute -bottom-2 z-10 left-2 w-4 h-4 bg-white rounded-full transition-all duration-700 ${isDark ? "translate-y-2" : "translate-y-0"}`}
            ></div>
            <div
              className={`absolute -bottom-2 z-10 right-6 w-5 h-5 bg-white rounded-full transition-all duration-700 ${isDark ? "translate-y-2" : "translate-y-0"}`}
            ></div>
            <div
              className={`absolute -bottom-1 z-10 -right-1 w-6 h-5 bg-white rounded-full transition-all duration-700 ${isDark ? "translate-y-2" : "translate-y-0"}`}
            ></div>
            <div
              className={`absolute bottom-1 z-10 -right-2 w-6 h-6 bg-white rounded-full transition-all duration-700 ${isDark ? "translate-y-2" : "translate-y-0"}`}
            ></div>
            <div
              className={`absolute -bottom-1 z-10 right-4 w-4 h-4 bg-white rounded-full transition-all duration-700 ${isDark ? "translate-y-2" : "translate-y-0"}`}
            ></div>

            {/* === กลุ่มก้อนเมฆชั้นหลัง (Background Cloud Layers) === */}
            <div className="absolute bottom-1 left-0 z-0 w-full">
              <div
                className={`absolute -bottom-2 left-2 w-4 h-4 rounded-full transition-all duration-700 ${isDark ? "translate-y-1 bg-[#9b9ca8]" : "translate-y-0 bg-[#a7c8e9]"}`}
              ></div>
              <div
                className={`absolute -bottom-1 right-6 w-5 h-5 rounded-full transition-all duration-700 ${isDark ? "translate-y-1 bg-[#9b9ca8]" : "translate-y-0 bg-[#a7c8e9]"}`}
              ></div>
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-5 rounded-full transition-all duration-700 ${isDark ? "translate-y-1 bg-[#9b9ca8]" : "translate-y-0 bg-[#a7c8e9]"}`}
              ></div>
            </div>
          </div>

          {/* ปุ่มสลับ (Thumb) / ดวงอาทิตย์ - ดวงจันทร์ (ย่อขนาดเหลือ h-7 w-7 เพื่อให้พอดีกับ h-8) */}
          <div
            className={`absolute z-20 top-0.5 w-6 h-6 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-700 transform ${
              isDark
                ? "translate-x-8 bg-[#D1D8E0] r-0" /* ขยับไปขวาสุดพอดีสำหรับ w-14 */
                : "translate-x-0.5 bg-gradient-to-b from-[#FFEE58] to-[#F39C12]"
            }`}
          >
            {isDark ? (
              /* ดวงจันทร์ พร้อมหลุมบนผิว */
              <div className="relative w-full h-full rounded-full bg-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.25)] flex items-center justify-center overflow-hidden">
                <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[#94A3B8] rounded-full shadow-inner"></div>
                <div className="absolute bottom-1.5 left-3 w-1 h-1 bg-[#94A3B8] rounded-full shadow-inner"></div>
                <div className="absolute top-3 right-1.5 w-2 h-2 bg-[#94A3B8] rounded-full shadow-inner"></div>
              </div>
            ) : (
              /* ดวงอาทิตย์ สีเหลืองนูนสวยงาม */
              <div className="w-6 h-6 rounded-full bg-gradient-to-b from-[#FFEE58] to-[#FFCA28] shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.15),0_2px_4px_rgba(243,156,18,0.4)] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#FFEE58] to-[#FBC02D]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
