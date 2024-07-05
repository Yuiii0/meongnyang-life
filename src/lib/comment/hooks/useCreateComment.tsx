import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { createComment } from "../api";
import { COMMENT } from "../key";
import { CommentDto } from "../type";

export default function useCreateComment(postId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, userId, content),
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: [COMMENT, postId] });
      const previousComments = queryClient.getQueryData([COMMENT, postId]);
      const newComment = {
        id: uuidv4(),
        postId,
        userId,
        content,
        createdAt: new Date(),
      };

      queryClient.setQueryData(
        [COMMENT, postId],
        (old: { pages: CommentDto[][]; pageParams: any[] } | undefined) => {
          if (!old) return { pages: [[newComment]], pageParams: [null] };
          const firstPage = old.pages[0];
          return {
            ...old,
            pages: [[newComment, ...firstPage], ...old.pages.slice(1)],
          };
        }
      );
      return { previousComments };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData([COMMENT, postId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });
}
