import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import toast from "react-hot-toast";
import { googleLogin } from "../api";
import { authErrorMessages } from "../error";

export default function useLogInByGoogle(
  onSuccess: (data: { user: User; isNewUser: boolean }) => void
) {
  const { mutate, isPending } = useMutation({
    mutationFn: googleLogin,
    onError: (error) => {
      if (error instanceof FirebaseError) {
        toast.error(
          authErrorMessages[error.code] || "로그인에 실패하였습니다."
        );
      } else {
        toast.error("로그인 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    },
    onSuccess,
  });
  return {
    logInByGoogle: mutate,
    isPending,
  };
}
