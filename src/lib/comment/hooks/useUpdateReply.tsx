import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReply } from "../api";
import { COMMENT } from "../key";
import { ReplyDto } from "../type";
import toast from 'react-hot-toast';

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
    onError: (err, { commentId }, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(
          [COMMENT, postId, commentId],
          context.previousReplies
        );
      }
      toast.error("오류가 발생하였습니다. 다시 시도해주세요");
      console.warn(err.message);
    },
    onSettled: (_data, _error, { commentId }) => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId, commentId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });
};
