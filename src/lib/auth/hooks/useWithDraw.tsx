import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import toast from "react-hot-toast";
import { withdrawalUser } from "../api";
import { authErrorMessages } from "../error";

export default function useWithdrawUser() {
  return useMutation({
    mutationFn: (user: User) => withdrawalUser(user),
    onSuccess: () => {
      toast("그동안 멍냥생활을 이용해주셔서 감사합니다.", { icon: "👋🏻" });
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        toast.error(
          authErrorMessages[error.code] || "회원탈퇴에 실패하였습니다."
        );
      } else {
        toast.error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });
}
