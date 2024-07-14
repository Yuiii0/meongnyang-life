import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePost } from "../api";
import { POST } from "../key";
import { PostDto } from "../type";

interface MutationContext {
  previousPost: PostDto;
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, postDto }: { postId: string; postDto: PostDto }) =>
      updatePost(postId, postDto),
    onMutate: async ({ postId, postDto }): Promise<MutationContext> => {
      await queryClient.cancelQueries({
        queryKey: [POST, postId],
      });
      const previousPost = queryClient.getQueryData<PostDto>([POST, postId]);
      if (!postDto || !previousPost) {
        throw new Error("포스트 정보가 없습니다");
      }
      queryClient.setQueryData([POST, postId], postDto);
      return { previousPost };
    },
    onError: (err, _data, context?: MutationContext) => {
      if (context) {
        queryClient.setQueryData(
          [POST, context.previousPost.id],
          context.previousPost
        );
      }
      toast.error("포스트 업데이트에 실패하였습니다.");
      console.warn(err.message);
    },
    onSettled: (_data, _error, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: [POST, postId],
      });
    },
  });
};
