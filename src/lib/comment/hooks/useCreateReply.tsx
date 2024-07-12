import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { createReply } from "../api";
import { COMMENT } from "../key";
import { ReplyDto } from "../type";

export const useCreateReply = (postId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => createReply(postId, commentId, userId, content),
    onMutate: async ({ commentId, content }) => {
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
        updatedAt: new Date(),
      };

      queryClient.setQueryData(
        [COMMENT, postId, commentId],
        (oldReplies: ReplyDto[] = []) => {
          return [newReply, ...oldReplies];
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
