import { useQuery } from "@tanstack/react-query";
import { getPostByPostId } from "../api";
import { POST } from "../key";

export const useGetPostByPostId = (postId: string) => {
  return useQuery({
    queryKey: [POST, postId],
    queryFn: () => getPostByPostId(postId),
    staleTime: 1000 * 60 * 1,
    enabled: !!postId,
  });
};
