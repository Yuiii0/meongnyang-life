import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api";
import { POST } from "../key";
import { postDto } from "../type";

interface MutationContext {
  previousPost: postDto;
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, postDto }: { postId: string; postDto: postDto }) =>
      updatePost(postId, postDto),
    onMutate: async ({ postId, postDto }): Promise<MutationContext> => {
      await queryClient.cancelQueries({
        queryKey: [POST, postId],
        exact: true,
      });
      const previousPost = queryClient.getQueryData<postDto>([POST, postId]);
      if (!postDto || !previousPost) {
        throw new Error("포스트 정보가 없습니다");
      }
      queryClient.setQueryData([POST, postId], postDto);
      return { previousPost };
    },
    onError: (_err, _data, context?: MutationContext) => {
      if (context) {
        queryClient.setQueryData(
          [POST, context.previousPost.id],
          context.previousPost
        );
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
