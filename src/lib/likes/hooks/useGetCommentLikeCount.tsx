import { useQuery } from "@tanstack/react-query";
import { getCommentLikeCount } from "../api";
import { COMMENT_LIKE_COUNT } from "../key";

export const useGetCommentLikeCount = (
  postId: string,
  commentId: string,
  type: "COMMENT" | "REPLY",
  replyId?: string
) => {
  return useQuery({
    queryFn: () => getCommentLikeCount(postId, commentId, type, replyId),
    queryKey: [COMMENT_LIKE_COUNT, commentId, replyId],
  });
};
