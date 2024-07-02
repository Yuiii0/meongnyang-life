import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePostLikeReaction } from "../api";
import { POST } from "../key";

export const useDeletePostLikeReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      removePostLikeReaction(postId, userId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: [POST, postId],
        exact: true,
      });

      const previousStatus = queryClient.getQueryData([POST, postId]);
      queryClient.setQueryData([POST, postId], false);
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
