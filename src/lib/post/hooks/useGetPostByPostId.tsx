import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api";
import { POST } from "../key";

export const useGetPostByPostId = (postId: string) => {
  return useQuery({
    queryKey: [POST, postId],
    queryFn: () => getPost(postId),
    staleTime: 1000 * 60 * 1,
  });
};
