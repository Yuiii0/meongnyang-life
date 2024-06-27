import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFollowing } from "../api";
import { FOLLOW_KEY } from "../key";

interface MutationContext {
  previousStatus: boolean | undefined;
}

export const useDeleteFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ myUserId, userId }: { myUserId: string; userId: string }) =>
      removeFollowing(myUserId, userId),
    onMutate: async ({ myUserId, userId }): Promise<MutationContext> => {
      await queryClient.cancelQueries({
        queryKey: [FOLLOW_KEY, myUserId, userId],
      });
      const previousStatus = queryClient.getQueryData<boolean>([
        FOLLOW_KEY,
        myUserId,
        userId,
      ]);
      queryClient.setQueryData([FOLLOW_KEY, myUserId, userId], false);

      return { previousStatus };
    },
    onError: (_err, { myUserId, userId }, context?: MutationContext) => {
      if (context) {
        queryClient.setQueryData(
          [FOLLOW_KEY, myUserId, userId],
          context.previousStatus
        );
      }
    },
    onSettled: (_data, _error, { myUserId, userId }) => {
      queryClient.invalidateQueries({
        queryKey: [FOLLOW_KEY, myUserId, userId],
      });
    },
  });
};
