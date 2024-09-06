import { useQuery } from "@tanstack/react-query";
import { searchPostsByTitle } from "../api";
import { SEARCH_POSTS } from "../key";

export function useGetPostsByTitle(title: string) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () => searchPostsByTitle(title),
    queryKey: [SEARCH_POSTS, title],
    enabled: !!title,
  });

  return { posts: data, isLoading, isError, error, refetch };
}
