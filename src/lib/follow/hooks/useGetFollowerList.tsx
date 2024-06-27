import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../api";
import { FOLLOWERS } from "../key";

export const useGetFollowerList = (userId: string) => {
  return useQuery({
    queryKey: [FOLLOWERS, userId],
    queryFn: () => getFollowers(userId),
    staleTime: 1000 * 60 * 1,
  });
};
