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
  const { user } = useAuthStore();

  const myUserId = user?.uid || "";
  const { data: isFollowing } = useGetFollowStatus(myUserId, userId);
  const { mutate: addFollowing } = useCreateFollow();
  const { mutate: removeFollowing } = useDeleteFollow();

  const handleToggleFollowButton = async () => {
    if (isFollowing) {
      removeFollowing({ myUserId, userId });
    } else {
      addFollowing({ myUserId, userId });
    }
  };

  return (
    <div>
      {isFollowing ? (
        <UnFollowButton handleToggleFollowButton={handleToggleFollowButton} />
      ) : (
        <FollowButton handleToggleFollowButton={handleToggleFollowButton} />
      )}
    </div>
  );
}

export default FollowToggleButton;
