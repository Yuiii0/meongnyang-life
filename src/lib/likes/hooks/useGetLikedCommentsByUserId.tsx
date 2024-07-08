import { useQuery } from "@tanstack/react-query";
import { getLikedCommentsByUserId } from "../api";
import { COMMENT_LIKED_BY_USER } from "../key";

export const useGetLikedCommentsByUserId = (userId: string) => {
  return useQuery({
    queryKey: [COMMENT_LIKED_BY_USER, userId],
    queryFn: () => getLikedCommentsByUserId(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2,
  });
};
