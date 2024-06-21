import { googleLogin } from "@/api/auth/auth.api";

function GoogleLogInButton() {
  return <button onClick={googleLogin}>구글로 로그인</button>;
}

export default GoogleLogInButton;
