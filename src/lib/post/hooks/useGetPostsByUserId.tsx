import { useQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "../api";
import { POST } from "../key";

export const useGetPostsByUserId = (userId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [POST, userId],
    queryFn: () => getPostsByUserId(userId),
    enabled: !!userId,
  });
  return { posts: data, isError, isLoading };
};
