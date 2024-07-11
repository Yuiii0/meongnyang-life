import { createUserProfile } from "@/lib/user/api";
import { UserProfile } from "@/lib/user/type";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { USER_PROFILE } from "../key";

export function useCreateUserProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userProfile: UserProfile) =>
      createUserProfile(userProfile, userId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        exact: true,
        queryKey: [USER_PROFILE, userId],
      }),

    onError: (error) => {
      toast.error("프로필 생성에 실패하였습니다");
      console.warn(error.message);
    },
  });
}
