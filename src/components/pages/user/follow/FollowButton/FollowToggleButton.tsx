import { useAuthStore } from "@/stores/auth/useAuthStore";

import { useCreateFollow } from "@/lib/follow/hooks/useCreateFollow";
import { useDeleteFollow } from "@/lib/follow/hooks/useDeleteFollow";
import { useGetFollowStatus } from "@/lib/follow/hooks/useGetFollowStatus";
import FollowButton from "./FollowingButton";
import UnFollowButton from "./UnFollowButton";

interface FollowButtonProps {
  userId: string;
}

function FollowToggleButton({ userId }: FollowButtonProps) {
  const user = useAuthStore((state) => state.user);

  const myUserId = user?.uid || "";

  const { data: isFollowing } = useGetFollowStatus(myUserId, userId);
  const { mutate: addFollowing } = useCreateFollow();
  const { mutate: removeFollowing } = useDeleteFollow();

  if (myUserId === userId) {
    return null;
  }

  const handleToggleFollowButton = async () => {
    if (isFollowing) {
      removeFollowing({ myUserId, userId });
    } else {
      addFollowing({ myUserId, userId });
    }
  };

  return (
    <span>
      {isFollowing ? (
        <UnFollowButton handleToggleFollowButton={handleToggleFollowButton} />
      ) : (
        <FollowButton handleToggleFollowButton={handleToggleFollowButton} />
      )}
    </span>
  );
}

export default FollowToggleButton;
