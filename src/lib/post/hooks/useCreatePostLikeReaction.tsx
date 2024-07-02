import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostLikeReaction } from "../api";
import { POST } from "../key";

export const useCreatePostLikeReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      createPostLikeReaction(postId, userId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: [POST, postId],
        exact: true,
      });
      const previousStatus = queryClient.getQueryData([POST, postId]);
      queryClient.setQueryData([POST, postId], true);
      return { previousStatus };
    },
    onError: (_err, { postId }, context) => {
      if (context) {
        queryClient.setQueryData([POST, postId], context.previousStatus);
      }
    },
    onSettled: (_data, _error, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: [POST, postId],
        exact: true,
      });
    },
  });
};
