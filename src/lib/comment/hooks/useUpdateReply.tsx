import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReply } from "../api";
import { COMMENT } from "../key";
import { ReplyDto } from "../type";

export const useUpdateReply = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      replyId,
      commentId,
      content,
    }: {
      replyId: string;
      commentId: string;
      content: string;
    }) => updateReply(postId, commentId, replyId, content),
    onMutate: async ({ replyId, commentId, content }) => {
      await queryClient.cancelQueries({
        queryKey: [COMMENT, postId, commentId],
      });
      const previousReplies = queryClient.getQueryData([
        COMMENT,
        postId,
        commentId,
      ]);

      queryClient.setQueryData(
        [COMMENT, postId, commentId],
        (oldReplies: ReplyDto[]) => {
          if (!oldReplies) return [];
          return oldReplies.map((reply) =>
            reply.id === replyId ? { ...reply, content } : reply
          );
        }
      );
      return { previousReplies };
    },
    onError: (_err, { commentId }, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(
          [COMMENT, postId, commentId],
          context.previousReplies
        );
      }
    },
    onSettled: (_data, _error, { commentId }) => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId, commentId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });
};
