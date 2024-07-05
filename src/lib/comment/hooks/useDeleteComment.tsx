import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from '../api';
import { COMMENT } from '../key';
import { POST } from '@/lib/post/key';

export default function useDeleteComment(postId: string, commentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });
}
