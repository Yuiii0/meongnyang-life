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

  return (
    <button
      onClick={handleClickGoogleLogIn}
      className="flex justify-center w-full px-4 py-3 mt-8 font-semibold text-gray-700 transition-all duration-75 bg-gray-100 rounded-lg text-gray gap-x-4 hover:bg-gray-200 active:border active:text-gray-700 active:border-gray-500 active:bg-white"
    >
      <img
        src="/public/icons/google.png"
        alt="google_logo"
        width={20}
        height={20}
      />
      구글로 로그인
    </button>
  );
}

export default GoogleLogInButton;
