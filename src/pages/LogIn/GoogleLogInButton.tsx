import { googleLogin } from "@/api/auth/auth.api";
import { useUserStore } from "@/stores/user/useUserStore";
import { useNavigate } from "react-router-dom";

function GoogleLogInButton() {
  const { setUser } = useUserStore();

  const navigate = useNavigate();
  const handleClickGoogleLogIn = async () => {
    const user = await googleLogin();
    if (user) {
      setUser(user);
      navigate("/main");
    }
  };

  return <button onClick={handleClickGoogleLogIn}>구글로 로그인</button>;
}

export default GoogleLogInButton;
