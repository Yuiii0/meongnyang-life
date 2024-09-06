import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api";
import { POST } from "../key";

export const useGetAllPosts = () => {
  const PAGE_SIZE = 3;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [POST],
    queryFn: ({ pageParam = null }) => getAllPosts(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < PAGE_SIZE) {
        return null;
      } else {
        return lastPage[lastPage.length - 1].createdAt;
      }
    },
  });
  return {
    posts: data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
};
