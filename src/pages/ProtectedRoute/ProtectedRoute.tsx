import { auth } from "@/api/firebase";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  //로그인 상태 체크
  const user = auth.currentUser;
  console.log("user 로그인", user);
  if (user === null) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
