import { getUserProfile } from "@/lib/user/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUserProfile(userId: string) {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 3,
  });
}
