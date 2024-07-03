import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Navigate } from "react-router-dom";
import { PATHS } from "../route";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  if (loading) {
    return <div>loading...</div>;
  }
  if (user === null) {
    return <Navigate to={PATHS.logIn} replace />;
  }

  return children;
}

export default ProtectedRoute;
