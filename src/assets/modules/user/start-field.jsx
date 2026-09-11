import { useMemo } from "react";

function generateStars(count) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 1, // 1px - 3.5px
    opacity: Math.random() * 0.7 + 0.3,
    twinkleDuration: `${Math.random() * 3 + 2}s`, // กะพริบ 2s - 5s
    driftDuration: `${Math.random() * 4 + 8}s`,   // เคลื่อนที่ช้าๆ 8s - 18s
    driftX: `${(Math.random() - 0.5) * 60}px`,     // ลอยไปซ้าย-ขวา (-30px ถึง +30px)
    driftY: `${(Math.random() - 0.5) * 60}px`,     // ลอยขึ้น-ลง (-30px ถึง +30px)
    delay: `${Math.random() * 5}s`,
  }));
}

export default function StarField({ count = 80 }) {
  const stars = useMemo(() => generateStars(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* ฝัง CSS Keyframes สำหรับการเคลื่อนไหวของดวงดาว */}
      <style>{`
        @keyframes starDrift {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(var(--drift-x), var(--drift-y));
          }
        }
      `}</style>

      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            "--drift-x": star.driftX,
            "--drift-y": star.driftY,
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.9)`,
            animation: `pulse ${star.twinkleDuration} ease-in-out infinite, starDrift ${star.driftDuration} ease-in-out infinite alternate`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}