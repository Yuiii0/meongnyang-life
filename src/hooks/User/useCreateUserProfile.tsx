import { createUserProfile } from "@/lib/user/api";
import { UserProfile } from "@/lib/user/type";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUserProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userProfile: UserProfile) =>
      createUserProfile(userProfile, userId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        exact: true,
        queryKey: ["userProfile", userId],
      }),
  });
}
