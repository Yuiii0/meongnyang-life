import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostLikeCount, removePostLikeReaction } from "../api";
import { POST, POST_LIKE_COUNT, POST_LIKE_STATUS } from "../key";

export const useDeletePostLikeReaction = (postId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await removePostLikeReaction(postId, userId);
      return await getPostLikeCount(postId); // 최신 likeCount 반환
    },
    onSuccess: (likeCount) => {
      queryClient.invalidateQueries({
        queryKey: [POST_LIKE_STATUS, postId, userId],
      });
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
      queryClient.setQueryData([POST_LIKE_COUNT, postId], likeCount); // 최신 likeCount 설정
    },
    mutationKey: [POST_LIKE_STATUS, postId, userId], // mutationKey 설정
  });
};
