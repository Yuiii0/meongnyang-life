import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { emailSignUp } from "../api";
import { authErrorMessages } from "../error";
import { SignUpDto } from "../type";

export default function useSignUpByEmail() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password, name }: SignUpDto) =>
      emailSignUp(email, password, name),
    onError: (error) => {
      if (error instanceof FirebaseError) {
        toast.error(
          authErrorMessages[error.code] || "로그인에 실패하였습니다."
        );
      } else {
        toast.error("로그인 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    },
  });
  return { signUpByEmail: mutate, isPending };
}
