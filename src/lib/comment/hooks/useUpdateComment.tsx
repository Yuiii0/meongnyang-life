import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
    onError: (err, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData([COMMENT, postId], context.previousComments);
      }
      toast.error("오류가 발생하였습니다. 다시 시도해주세요");
      console.warn(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId] });
    },
  });
}
