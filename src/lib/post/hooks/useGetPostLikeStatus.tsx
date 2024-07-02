import { useQuery } from "@tanstack/react-query";
import { getPostLikeStatus } from "../api";
import { POST } from "../key";

export const useGetPostLikeStatus = (postId: string, userId: string) => {
  return useQuery({
    queryFn: () => getPostLikeStatus(postId, userId),
    queryKey: [POST, postId],
    staleTime: 1000 * 60 * 1,
  });
};
