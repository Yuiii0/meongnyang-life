import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteComment } from "../api";
import { COMMENT } from "../key";

export default function useDeleteComment(postId: string, commentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
    onError: (error) => {
      toast.error("오류가 발생하였습니다. 다시 시도해주세요");
      console.warn(error.message);
    },
  });
}
