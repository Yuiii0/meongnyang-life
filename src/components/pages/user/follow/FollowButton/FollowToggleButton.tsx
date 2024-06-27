import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useState } from "react";

import FollowButton from "./FollowingButton";
import UnFollowButton from "./UnFollowButton";

interface FollowButtonProps {
  userId: string;
}

function FollowToggleButton({ userId }: FollowButtonProps) {
  const { user } = useAuthStore();
  const myUserId = user?.uid;

  const [isFollowing, setIsFollow] = useState<boolean>(false);

  const handleToggleFollowButton = async () => {};

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
