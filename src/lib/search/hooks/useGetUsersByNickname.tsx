import { useQuery } from "@tanstack/react-query";
import { searchUsersByNickname } from "../api";
import { SEARCH_USERS } from "../key";

export function useGetUsersByNickname(nickname: string) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () => searchUsersByNickname(nickname),
    queryKey: [SEARCH_USERS, nickname],
    enabled: !!nickname,
  });

  return { userIds: data, isLoading, isError, error, refetch };
}
