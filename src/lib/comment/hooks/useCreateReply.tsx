import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { createReply } from "../api";
import { COMMENT } from "../key";
import { ReplyDto } from "../type";

export const useCreateReply = (
  postId: string,
  commentId: string,
  userId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      createReply(postId, commentId, userId, content),
    onMutate: async (content: string) => {
      await queryClient.cancelQueries({
        queryKey: [COMMENT, postId, commentId],
      });
      const previousReplies = queryClient.getQueryData([
        COMMENT,
        postId,
        commentId,
      ]);
      const newReply = {
        id: uuidv4(),
        postId,
        userId,
        commentId,
        content,
        createdAt: new Date(),
      };

      queryClient.setQueryData(
        [COMMENT, postId, commentId],
        (oldReplies: ReplyDto[]) => {
          if (!oldReplies) return [newReply];
          return [newReply, ...oldReplies];
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
