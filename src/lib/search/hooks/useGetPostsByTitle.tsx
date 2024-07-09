import { useQuery } from "@tanstack/react-query";
import { searchPostsByTitle } from "../api";
import { SEARCH_POSTS } from "../key";

export function useGetPostsByTitle(title: string) {
  return useQuery({
    queryFn: () => searchPostsByTitle(title),
    queryKey: [SEARCH_POSTS, title],
    enabled: !!title,
  });
}
