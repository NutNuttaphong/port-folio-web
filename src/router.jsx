import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import NavBar from "./assets/menu-bar/nav-bar";
import Sidebar from "./assets/menu-bar/sidebar";
import MenuBar from "./assets/menu-bar/menu-bar";
import EventCarousel from "./assets/modules/user/home";
import Footer from "./assets/footer/footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatWidget from "./components/ChatWidget";

// User Routes (Loaded on demand)
const AboutPage = lazy(() => import("./assets/modules/user/about-page"));
const ContactsPage = lazy(() => import("./assets/modules/user/contacts-page"));

// ========================================================
// CODE SPLITTING: LAZY LOADED ROUTE MODULES
// ========================================================
// User Routes (Loaded on demand)
const Services = lazy(() => import("./assets/modules/user/services-page"));
const PortfolioPage = lazy(() => import("./assets/modules/user/portfolio-page"));
const Inspiration = lazy(() => import("./assets/modules/user/inspiration-page"));
const BookingPage = lazy(() => import("./assets/modules/user/booking-page"));

// Admin Routes (Completely detached from visitor entry bundle)
const TableHome = lazy(() => import("./assets/modules/admin/home-am/table-home"));
const TableAbout = lazy(() => import("./assets/modules/admin/about-am/table-about"));
const TableInspiration = lazy(() => import("./assets/modules/admin/inspiration-am/table-inspiration"));
const TablePort = lazy(() => import("./assets/modules/admin/portfolio-am/table-port"));
const TableService = lazy(() => import("./assets/modules/admin/services-am/table-service"));
const TableUser = lazy(() => import("./assets/modules/admin/user-am/table-user"));

function PageLoader({ isDark }) {
  return (
    <div
      className={`flex min-h-[50vh] w-full items-center justify-center transition-colors duration-500 ${
        isDark ? "text-teal-400" : "text-teal-600"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span className="text-xs font-mono tracking-widest opacity-75">LOADING...</span>
      </div>
    </div>
  );
}

function EventDetailPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center text-white">
      <h1 className="text-3xl font-bold">Event Detail Page</h1>
    </div>
  );
}

function RootLayout() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme_mode");
    if (saved !== null) return saved === "dark";
    return true; // Default to dark mode
  });
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/table-");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme_mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme_mode", "light");
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${
      isDark 
        ? "bg-[#0B101D] text-white"  // 🌙 ธีมมืดพรีเมียม
        : "bg-[#FFFFFF] text-slate-900" // ☀️ ธีมสว่าง
    }`}>
      {/* ส่ง isDark และ setIsDark เข้าไปใน MenuBar */}
      {isHomePage && <NavBar isDark={isDark} setIsDark={setIsDark} />}
      {!isHomePage && !isAdminPage && (
        <MenuBar isDark={isDark} setIsDark={setIsDark} />
      )}

      <div className={isDark ? "flex w-full bg-[#0e1a42]" : "flex w-full bg-[#f8fafc]"}>
        {isAdminPage && <Sidebar />}

        <div className="flex-1 flex flex-col min-w-0">
          <div
            className={isAdminPage ? "flex-1 p-8 sm:p-12 overflow-y-auto" : ""}
          >
            <Suspense fallback={<PageLoader isDark={isDark} />}>
              <Outlet context={{ isDark }} />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer isDark={isDark} />
      {!isAdminPage && <ChatWidget />}
    </div>
  );
}

// ไม่ต้อง export ตัวแปร router ออกไป
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <EventCarousel /> },
      { path: "/event-detail", element: <EventDetailPage /> },
      { path: "/event/:id", element: <EventDetailPage /> },
      { path: "/event/services", element: <Services /> },
      { path: "/portfolio", element: <PortfolioPage /> },
      { path: "/about-us", element: <AboutPage /> },
      { path: "/inspiration", element: <Inspiration /> },
      { path: "/event/contacts", element: <ContactsPage /> },
      { path: "/booking", element: <BookingPage /> },
      { path: "/login", element: <BookingPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/table-home", element: <TableHome /> },
          { path: "/table-about", element: <TableAbout /> },
          { path: "/table-inspiration", element: <TableInspiration /> },
          { path: "/table-port", element: <TablePort /> },
          { path: "/table-service", element: <TableService /> },
          { path: "/table-user", element: <TableUser /> },
        ],
      },
    ],
  },
]);

// Export เป็น Component ตัวเดียว (ESLint จะไม่เตือน)
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
