import useLogInByGoogle from "@/lib/auth/hooks/useLogInByGoogle";
import { PATHS } from "@/pages/route";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useNavigate } from "react-router-dom";

function GoogleLogInButton() {
  const { setUser } = useAuthStore();
  const { mutate: logInByGoogle, isPending } = useLogInByGoogle();
  const navigate = useNavigate();
  const handleClickGoogleLogIn = () => {
    logInByGoogle(undefined, {
      onSuccess: (user) => {
        setUser(user || null);
        navigate(PATHS.main);
      },
    });
  };

  return (
    <button
      onClick={handleClickGoogleLogIn}
      disabled={isPending}
      className="flex justify-center w-full px-4 py-3 mt-8 font-semibold text-gray-700 transition-all duration-75 bg-gray-100 rounded-lg text-gray gap-x-4 hover:bg-gray-200 active:border active:text-gray-700 active:border-gray-500 active:bg-white"
    >
      <img src="icons/google.webp" alt="google_logo" width={20} height={20} />
      구글로 로그인
    </button>
  );
}

export default GoogleLogInButton;
