import { useQuery } from "@tanstack/react-query";
import { getLikedPostsByUserId } from "../api";
import { POST_LIKED_BY_USER } from "../key";

export const useGetLikedPostsByUserId = (userId: string) => {
  return useQuery({
    queryKey: [POST_LIKED_BY_USER, userId],
    queryFn: () => getLikedPostsByUserId(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2,
  });
};
