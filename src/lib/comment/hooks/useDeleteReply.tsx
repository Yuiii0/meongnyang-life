import { POST } from "@/lib/post/key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReply } from "../api";
import { COMMENT } from "../key";

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
  });
};
