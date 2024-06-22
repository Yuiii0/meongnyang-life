import { useUserStore } from "@/stores/user/useUserStore";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
