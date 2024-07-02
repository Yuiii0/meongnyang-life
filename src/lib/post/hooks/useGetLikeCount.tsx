import { useQuery } from "@tanstack/react-query";
import { getPostLikeCount } from "../api";
import { POST_LIKE_COUNT } from "../key";

export const useGetPostLikeCount = (postId: string) => {
  return useQuery({
    queryFn: () => getPostLikeCount(postId),
    queryKey: [POST_LIKE_COUNT, postId],
  });
};
