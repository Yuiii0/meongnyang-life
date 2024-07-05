import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../api";
import { COMMENT } from "../key";
import { CommentDto } from "../type";

export default function useUpdateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => updateComment(postId, commentId, content),
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: [COMMENT, postId] });
      const previousComments = queryClient.getQueryData([COMMENT, postId]);

      queryClient.setQueryData(
        [COMMENT, postId],
        (old: { pages: CommentDto[][]; pageParams: any[] } | undefined) => {
          if (!old) return { pages: [], pageParams: [] };
          return {
            ...old,
            pages: old.pages.map((page) =>
              page.map((comment) =>
                comment.id === commentId
                  ? { ...comment, content, updatedAt: new Date() }
                  : comment
              )
            ),
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
    },
  });
}
