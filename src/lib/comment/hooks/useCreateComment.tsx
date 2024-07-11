import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
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
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
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
    onError: (err, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData([COMMENT, postId], context.previousComments);
      }
      toast.error("오류가 발생했습니다. 다시 시도해주세요");
      console.warn(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });
}
