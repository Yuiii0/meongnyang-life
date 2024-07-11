import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReply } from "../api";
import { COMMENT } from "../key";
import toast from 'react-hot-toast';

export const useDeleteReply = (
  postId: string,
  commentId: string,
  replyId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteReply(postId, commentId, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId, commentId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
    onError: (error) => {
      toast.error("오류가 발생하였습니다. 다시 시도해주세요");
      console.warn(error.message);
    },
  });
};
