import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
    onError: (error) => {
      toast.error("포스트 작성에 실패하였습니다.");
      console.warn(error.message);
    },
  });
}
