import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReply } from "../api";
import { COMMENT } from "../key";
import { ReplyDto } from "../type";

export const useUpdateReply = (postId: string, commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ replyId, content }: { replyId: string; content: string }) =>
      updateReply(postId, commentId, replyId, content),
    onMutate: async ({ replyId, content }) => {
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
    onError: (_err, _variables, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(
          [COMMENT, postId, commentId],
          context.previousReplies
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId, commentId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });
};
