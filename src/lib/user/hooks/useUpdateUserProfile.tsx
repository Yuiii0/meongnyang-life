import { updateUserProfile } from "@/lib/user/api";
import { UserProfile } from "@/lib/user/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { USER_PROFILE } from "../key";

export function useUpdateUserProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userProfile: UserProfile) =>
      updateUserProfile(userId, userProfile),
    onSuccess: () =>
      queryClient.invalidateQueries({
        exact: true,
        queryKey: [USER_PROFILE, userId],
      }),
    onError: (error) => {
      toast.error("프로필 업데이트 실패하였습니다");
      console.warn(error.message);
    },
  });
}
