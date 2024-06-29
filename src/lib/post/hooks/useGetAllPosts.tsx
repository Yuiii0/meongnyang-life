import { useQuery } from "@tanstack/react-query";
import { getPostAllPosts } from "../api";
import { POST } from "../key";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: [POST],
    queryFn: getPostAllPosts,
    staleTime: 1000 * 30,
  });
};
