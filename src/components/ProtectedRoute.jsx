import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const user = localStorage.getItem("currentUser");
  let isAuthenticated = false;

  if (user) {
    try {
      const parsed = JSON.parse(user);
      // Must have valid access_token for backend authentication
      if (parsed && (parsed.access_token || parsed.token)) {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated) {
    if (user) {
      localStorage.removeItem("currentUser");
    }
    return <Navigate to="/booking" replace />;
  }

  return <Outlet />;
}
