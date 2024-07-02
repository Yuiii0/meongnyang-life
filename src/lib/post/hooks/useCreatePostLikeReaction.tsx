import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostLikeReaction, getPostLikeCount } from "../api";
import { POST_LIKE_COUNT, POST_LIKE_STATUS } from "../key";

export const useCreatePostLikeReaction = (postId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await createPostLikeReaction(postId, userId);
      return await getPostLikeCount(postId);
    },
    onSuccess: (likeCount) => {
      queryClient.invalidateQueries({
        queryKey: [POST_LIKE_STATUS, postId, userId],
      });
      queryClient.setQueryData([POST_LIKE_COUNT, postId], likeCount); // 최신 likeCount 설정
    },
    mutationKey: [POST_LIKE_STATUS, postId, userId], // mutationKey 설정
  });
};
