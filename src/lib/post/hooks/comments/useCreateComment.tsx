import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../api";
import { COMMENT, POST } from "../../key";

export default function useCreateComment(postId: string, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, userId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT, postId] });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });
}
