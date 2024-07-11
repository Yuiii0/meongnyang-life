import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addFollowing } from "../api";
import { FOLLOWERS, FOLLOWINGS, FOLLOW_STATUS } from "../key";

interface MutationContext {
  previousStatus: boolean | undefined;
}

export const useCreateFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ myUserId, userId }: { myUserId: string; userId: string }) =>
      addFollowing(myUserId, userId),
    onMutate: async ({ myUserId, userId }): Promise<MutationContext> => {
      await queryClient.cancelQueries({
        queryKey: [FOLLOW_STATUS, myUserId, userId],
        exact: true,
      });
      await queryClient.cancelQueries({
        queryKey: [FOLLOWINGS, myUserId],
        exact: true,
      });
      await queryClient.cancelQueries({
        queryKey: [FOLLOWERS, userId],
        exact: true,
      });
      const previousStatus = queryClient.getQueryData<boolean>([
        FOLLOW_STATUS,
        myUserId,
        userId,
      ]);
      queryClient.setQueryData([FOLLOW_STATUS, myUserId, userId], true);

      return { previousStatus };
    },
    onError: (_err, { myUserId, userId }, context?: MutationContext) => {
      if (context) {
        queryClient.setQueryData(
          [FOLLOW_STATUS, myUserId, userId],
          context.previousStatus
        );
      }
      toast.error("오류가 발생했습니다. 다시 시도해주세요");
    },
    onSettled: (_data, _error, { myUserId, userId }) => {
      queryClient.invalidateQueries({
        queryKey: [FOLLOW_STATUS, myUserId, userId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [FOLLOWINGS, myUserId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [FOLLOWERS, userId],
        exact: true,
      });
    },
  });
};
