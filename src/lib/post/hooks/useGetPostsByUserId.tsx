import { useQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "../api";
import { POST } from "../key";

export const useGetPostsByUserId = (userId: string) => {
  return useQuery({
    queryKey: [POST, userId],
    queryFn: () => getPostsByUserId(userId),
    enabled: !!userId,
  });
};
