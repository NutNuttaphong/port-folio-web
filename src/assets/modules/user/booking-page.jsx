import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, AlertCircle } from "lucide-react";

function BookingPage() {
  const navigate = useNavigate();

  // State สำหรับเก็บค่าที่พิมพ์
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันจัดการตอนกด Login (เชื่อมต่อกับ Backend NestJS)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate inputs
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both Username and Password.");
      return;
    }

    setIsLoading(true);

    try {
      // Send POST request to NestJS Backend
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid username or password.");
      }

      // Login success -> store user session in localStorage
      localStorage.setItem("currentUser", JSON.stringify(data));
      navigate("/table-home");
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to connect to the server.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full items-center justify-center px-4 py-12">
      {/* กล่องการ์ด Login */}
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900/80 p-8 sm:p-10 shadow-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
        {/* หัวข้อ */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in to continue to your bookings
          </p>
        </div>

        {/* ฟอร์มเข้าสู่ระบบ */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* แจ้งเตือนเมื่อเกิด Error */}
          {errorMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ช่องกรอก Username */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Username
            </label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-800/80 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-white/10 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition shadow-sm"
              />
            </div>
          </div>

          {/* ช่องกรอก Password */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-3.5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-800/80 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-white/10 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 transition shadow-sm"
              />
            </div>
          </div>

          {/* ปุ่ม Sign In */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl bg-[#00bda6] py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:bg-[#00a894] hover:shadow-teal-500/40 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* ข้อความช่วยเหลือ */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Connected to NestJS Backend API
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
