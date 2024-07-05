import { useQuery } from "@tanstack/react-query";
import { getPostLikeStatus } from "../api";
import { POST_LIKE_STATUS } from "../key";

export const useGetPostLikeStatus = (postId: string, userId: string) => {
  return useQuery({
    queryKey: [POST_LIKE_STATUS, postId, userId],
    queryFn: () => getPostLikeStatus(postId, userId),
    staleTime: 1000 * 60 * 1,
  });
};
