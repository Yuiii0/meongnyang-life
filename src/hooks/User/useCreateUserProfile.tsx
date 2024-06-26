import { createUserProfile } from "@/api/database/User/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "firebase/auth";

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
