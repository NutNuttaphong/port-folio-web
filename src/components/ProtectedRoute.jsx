import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    // ถ้ายังไม่ได้ล็อกอิน ให้เด้งกลับไปที่หน้า Login (/booking) ทันที
    return <Navigate to="/booking" replace />;
  }

  return <Outlet />;
}
