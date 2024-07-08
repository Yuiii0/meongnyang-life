import { useQuery } from "@tanstack/react-query";
import { getCommentLikeStatus } from "../api";
import { COMMENT_LIKE_STATUS } from "../key";

export const useGetCommentLikeStatus = (
  commentId: string,
  userId: string,
  type: "COMMENT" | "REPLY",
  replyId?: string
) => {
  return useQuery({
    queryKey: [COMMENT_LIKE_STATUS, userId, commentId, replyId],
    queryFn: () => getCommentLikeStatus(commentId, userId, type, replyId),
    staleTime: 1000 * 60 * 1,
  });
};
