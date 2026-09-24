import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import NavBar from "./assets/menu-bar/nav-bar";
import Sidebar from "./assets/menu-bar/sidebar";
import MenuBar from "./assets/menu-bar/menu-bar";
import EventCarousel from "./assets/modules/user/home";
import Services from "./assets/modules/user/services-page";
import PortfolioPage from "./assets/modules/user/portfolio-page";
import AboutPage from "./assets/modules/user/about-page";
import Inspiration from "./assets/modules/user/inspiration-page";
import ContactsPage from "./assets/modules/user/contacts-page";
import BookingPage from "./assets/modules/user/booking-page";
import Footer from "./assets/footer/footer";

import TableHome from "./assets/modules/admin/home-am/table-home";
import TableAbout from "./assets/modules/admin/about-am/table-about";
import TableInspiration from "./assets/modules/admin/inspiration-am/table-inspiration";
import TablePort from "./assets/modules/admin/portfolio-am/table-port";
import TableService from "./assets/modules/admin/services-am/table-service";
import TableUser from "./assets/modules/admin/user-am/table-user";
import ProtectedRoute from "./components/ProtectedRoute";

function getBackgroundStyle(pathname) {
  // 1. หน้าแรก (Home): ธีมน้ำเงินเข้มอวกาศ
  if (pathname === "/") {
    return "bg-gradient-to-b from-[#09112d] via-[#060b1e] to-[#030611]";
  }

  // 2. หน้า Portfolio: ธีมมืดอมม่วง/Slate
  if (pathname.startsWith("/portfolio")) {
    return "bg-[#FFFFFF]";
  }

  // 3. หน้า Services / Contacts: ธีมน้ำเงินเข้มหม่น
  if (
    pathname.startsWith("/event/services") ||
    pathname.startsWith("/event/contacts")
  ) {
    return "bg-[#FFFFFF]";
  }

  // 4. หน้ารายละเอียด Event (/event/:id)
  if (pathname.startsWith("/event/")) {
    return "bg-gradient-to-b from-slate-900 to-black";
  }

  // ค่า Default สำหรับหน้าอื่นๆ (เช่น About Us, Booking)
  return "bg-[#FFFFFF]";
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
  // ตรวจสอบว่าอยู่หน้าแรก (Home) หรือไม่
  const [isDark, setIsDark] = useState(false); // ควบคุมสถานะ Dark/Light ที่นี่
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/table-");
  // const isTableHome = location.pathname === "/table-home";
  // const isTablePort = location.pathname === "/table-port";
  // const isTableAbout = location.pathname === "/table-about";
  // const isTableIns = location.pathname === "/table-inspiration";
  // const isTableService = location.pathname === "/table-service";

  // const currentBg = getBackgroundStyle(location.pathname);

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${
      isDark 
        ? "bg-[#0B101D] text-white"  // 🌙 ธีมมืดพรีเมียม
        : "bg-[#FFFFFF] text-slate-900" // ☀️ ธีมสว่าง
    }`}>
      {/* <span currentPath={currentPath == "/"} className="hidden">
        <NavBar />
      </span> */}
      {/* ส่ง isDark และ setIsDark เข้าไปใน MenuBar */}
      {isHomePage && <NavBar isDark={isDark} setIsDark={setIsDark} />}
      {!isHomePage && !isAdminPage && (
        <MenuBar isDark={isDark} setIsDark={setIsDark} />
      )}

      <div className={isDark ? "flex w-full bg-[#1a1a1a]" : "flex w-full bg-[#f8fafc]"}>
        {isAdminPage && <Sidebar />}

        <div className="flex-1 flex flex-col min-w-0">
          <div
            className={isAdminPage ? "flex-1 p-8 sm:p-12 overflow-y-auto" : ""}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
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
