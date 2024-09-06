import useLogInByGoogle from "@/lib/auth/hooks/useLogInByGoogle";
import { PATHS } from "@/pages/route";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useNavigate } from "react-router-dom";

function GoogleLogInButton() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const { logInByGoogle, isPending } = useLogInByGoogle((data) => {
    const { user, isNewUser } = data;
    setUser(user || null);

    if (isNewUser) {
      navigate(PATHS.profiles.create);
    } else {
      navigate(PATHS.main);
    }
  });

  const handleClickGoogleLogIn = () => {
    logInByGoogle();
  };

  return (
    <button
      onClick={handleClickGoogleLogIn}
      disabled={isPending}
      className="flex justify-center w-full px-4 py-3 mt-4 font-semibold text-gray-700 transition-all duration-75 bg-gray-100 rounded-lg shadow-sm text-gray gap-x-4 hover:bg-gray-200 active:border active:text-gray-700 active:border-gray-500 active:bg-white"
    >
      <img src="icons/google.webp" alt="google_logo" width={20} height={20} />
      구글로 로그인
    </button>
  );
}

export default GoogleLogInButton;
