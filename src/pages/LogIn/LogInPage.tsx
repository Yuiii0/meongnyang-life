import LogInForm from "@/components/pages/logIn/LogInForm";
import { Link } from "react-router-dom";

function LogInPage() {
  return (
    <div>
      <h1>🐾 멍냥 생활</h1>
      <LogInForm />
      <Link to="/signup">계정 만들기</Link>
      <Link to="/find/pw">비밀번호 재설정</Link>
    </div>
  );
}

export default LogInPage;
