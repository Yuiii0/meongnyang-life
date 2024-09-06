import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { Auth, sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

export default function useResetPw() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ auth, email }: { auth: Auth; email: string }) =>
      sendPasswordResetEmail(auth, email),
    onSuccess: () => {
      toast("메일을 확인해주세요", { icon: "✉️" });
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        toast.error("에러가 발생했습니다. 다시 시도해주세요.");
      } else {
        toast.error("에러가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });
  return { resetPassword: mutate, isPending };
}
