import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api";
import { POST } from "../key";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => deletePost(postId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: [POST, postId],
      });

      const previousPost = queryClient.getQueryData([POST, postId]);
      queryClient.setQueryData([POST, postId], null);

      return { previousPost };
    },
    onError: (_err, { postId }, context) => {
      queryClient.setQueryData([POST, postId], context?.previousPost);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [POST] });
    },
  });
};
