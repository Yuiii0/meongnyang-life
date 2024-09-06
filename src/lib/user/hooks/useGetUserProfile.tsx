import { getUserProfile } from "@/lib/user/api";
import { useQuery } from "@tanstack/react-query";
import { USER_PROFILE } from "../key";

export function useGetUserProfile(userId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [USER_PROFILE, userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 3,
  });
  return {
    userProfile: data,
    isLoading,
    isError,
  };
}
