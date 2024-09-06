import { useQuery } from "@tanstack/react-query";
import { getPostByPostId } from "../api";
import { POST } from "../key";

export const useGetPostByPostId = (postId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [POST, postId],
    queryFn: () => getPostByPostId(postId),
    staleTime: 1000 * 60 * 2,
    enabled: !!postId,
  });
  return { post: data, isError, isLoading, error };
};
