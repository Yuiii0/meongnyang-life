import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPostLikeReaction } from "../api";
import { POST_LIKE_COUNT, POST_LIKE_STATUS, POST_LIKED_BY_USER } from "../key";

export const useCreatePostLikeReaction = (postId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createPostLikeReaction(postId, userId),
    onMutate: async () => {
      const previousLikeCount = queryClient.getQueryData([
        POST_LIKE_COUNT,
        postId,
      ]);

      queryClient.setQueryData<number | undefined>(
        [POST_LIKE_COUNT, postId],
        (old) => (old ?? 0) + 1
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
      toast.error("오류가 발생했습니다. 다시 시도해주세요");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_LIKE_STATUS, postId, userId],
      });
      queryClient.invalidateQueries({ queryKey: [POST_LIKE_COUNT, postId] });
      queryClient.invalidateQueries({ queryKey: [POST_LIKED_BY_USER, userId] });
    },
  });
};
