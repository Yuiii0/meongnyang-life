import { useQuery } from "@tanstack/react-query";
import { getFollowings } from "../api";
import { FOLLOWINGS } from "../key";

export const useGetFollowingList = (userId: string) => {
  return useQuery({
    queryKey: [FOLLOWINGS, userId],
    queryFn: () => getFollowings(userId),
    staleTime: 1000 * 60 * 1,
  });
};
