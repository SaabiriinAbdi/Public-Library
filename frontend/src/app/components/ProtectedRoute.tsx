import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { patronAuthenticated, staffAuthenticated } = useAuth();

  const isStaffRoute = location.pathname.startsWith("/staff");

  // Staff section protection
  if (isStaffRoute && !staffAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Patron section protection (if you ever protect patron pages)
  if (!isStaffRoute && !patronAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
