import { useQuery } from "@tanstack/react-query";
import { getFollowStatus } from "../api";
import { FOLLOW_STATUS } from "../key";

export const useGetFollowStatus = (myUserId: string, userId: string) => {
  return useQuery({
    queryFn: () => getFollowStatus(myUserId, userId),
    queryKey: [FOLLOW_STATUS, myUserId, userId],
    staleTime: 1000 * 60 * 1,
  });
};
