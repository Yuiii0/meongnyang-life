import { useQuery } from "@tanstack/react-query";
import { getRepliesByCommentId } from "../api";
import { COMMENT } from "../key";

export const useGetRepliesByCommentId = (postId: string, commentId: string) => {
  return useQuery({
    queryKey: [COMMENT, postId, commentId],
    queryFn: () => getRepliesByCommentId(postId, commentId),
  });
};
