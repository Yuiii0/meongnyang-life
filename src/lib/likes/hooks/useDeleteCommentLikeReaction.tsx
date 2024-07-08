import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCommentLikeReaction } from "../api";
import { COMMENT_LIKE_COUNT, COMMENT_LIKE_STATUS } from "../key";

export const useDeleteCommentLikeReaction = (
  postId: string,
  commentId: string,
  userId: string,
  type: "COMMENT" | "REPLY",
  replyId?: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      removeCommentLikeReaction(postId, commentId, userId, type, replyId),
    onMutate: async () => {
      const previousLikeCount = queryClient.getQueryData([
        COMMENT_LIKE_COUNT,
        commentId,
        replyId,
      ]);

      queryClient.setQueryData<number | undefined>(
        [COMMENT_LIKE_COUNT, commentId, replyId],
        (old) => (old ?? 0) - 1
      );

      return { previousLikeCount };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousLikeCount) {
        queryClient.setQueryData(
          [COMMENT_LIKE_COUNT, commentId, replyId],
          context.previousLikeCount
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [COMMENT_LIKE_STATUS, userId, commentId, replyId],
      });
      queryClient.invalidateQueries({
        queryKey: [COMMENT_LIKE_COUNT, commentId, replyId],
      });
    },
  });
};
