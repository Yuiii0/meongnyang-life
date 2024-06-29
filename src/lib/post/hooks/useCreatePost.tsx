import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api";
import { POST } from "../key";

export default function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      const postId = data;
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });
}
