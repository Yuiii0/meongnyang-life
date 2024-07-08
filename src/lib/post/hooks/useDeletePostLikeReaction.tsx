import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePostLikeReaction } from "../api";
import { POST_LIKE_COUNT, POST_LIKE_STATUS } from "../key";

export const useDeletePostLikeReaction = (postId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await removePostLikeReaction(postId, userId);
    },
    onMutate: async () => {
      const previousLikeCount = queryClient.getQueryData([
        POST_LIKE_COUNT,
        postId,
      ]);

      queryClient.setQueryData<number | undefined>(
        [POST_LIKE_COUNT, postId],
        (old) => (old ?? 0) - 1
      );

      return { previousLikeCount };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousLikeCount) {
        queryClient.setQueryData(
          [POST_LIKE_COUNT, postId],
          context.previousLikeCount
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_LIKE_STATUS, postId, userId],
      });
      queryClient.invalidateQueries({ queryKey: [POST_LIKE_COUNT, postId] });
    },
  });
};
