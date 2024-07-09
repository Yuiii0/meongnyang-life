import { useQuery } from "@tanstack/react-query";
import { searchUsersByNickname } from "../api";
import { SEARCH_USERS } from "../key";

export function useGetUsersByNickname(nickname: string) {
  return useQuery({
    queryFn: () => searchUsersByNickname(nickname),
    queryKey: [SEARCH_USERS, nickname],
    enabled: !!nickname,
  });
}
