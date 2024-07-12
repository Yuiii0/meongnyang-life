import { useMutation } from "@tanstack/react-query";
import { logOut } from "../api";

export default function useLogOut() {
  return useMutation({
    mutationFn: logOut,
  });
}
