import { auth } from "@/api/auth/auth.api";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  //로그인 상태 체크
  const user = auth.currentUser;

  if (user === null) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/main" />;
  }

  return children;
}

export default ProtectedRoute;
