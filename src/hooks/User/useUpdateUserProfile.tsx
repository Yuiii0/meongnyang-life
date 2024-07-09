import { updateUserProfile } from "@/lib/user/api";
import { UserProfile } from "@/lib/user/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userProfile: UserProfile) =>
      updateUserProfile(userId, userProfile),
    onSuccess: () =>
      queryClient.invalidateQueries({
        exact: true,
        queryKey: ["userProfile", userId],
      }),
  });
}
