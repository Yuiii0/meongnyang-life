import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "../../api";
import { COMMENT } from "../../key";

export const useGetCommentsByPostId = (postId: string) => {
  const PAGE_SIZE = 5;
  return useInfiniteQuery({
    queryKey: [COMMENT, postId],
    queryFn: ({ pageParam = null }) => getCommentsByPostId(postId, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < PAGE_SIZE) {
        return null;
      } else {
        return lastPage[lastPage.length - 1].createdAt;
      }
    },
    staleTime: 1000 * 60 * 1,
  });
};
