import { useQuery } from "@tanstack/react-query";
import { getFollowStatus } from "../api";
import { FOLLOW_KEY } from "../key";

export const useGetFollowStatus = (myUserId: string, userId: string) => {
  return useQuery({
    queryFn: () => getFollowStatus(myUserId, userId),
    queryKey: [FOLLOW_KEY, myUserId, userId],
  });
};
