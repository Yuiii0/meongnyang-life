interface FollowingButtonProps {
  handleToggleFollowButton: () => void;
}

function FollowButton({ handleToggleFollowButton }: FollowingButtonProps) {
  return (
    <button
      onClick={handleToggleFollowButton}
      aria-label="Follow"
      className="px-6 py-2 text-sm text-white border rounded-lg border-brand-100 active:border bg-brand-100 hover:border-brand-100 hover:bg-opacity-90 hover:transition-all active:border-brand-100 active:text-brand-100 active:bg-white "
    >
      팔로우
    </button>
  );
}

export default FollowButton;
