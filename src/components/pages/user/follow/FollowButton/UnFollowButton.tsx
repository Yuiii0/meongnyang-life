interface UnFollowButtonProps {
  handleToggleFollowButton: () => void;
}

function UnFollowButton({ handleToggleFollowButton }: UnFollowButtonProps) {
  return (
    <button
      onClick={handleToggleFollowButton}
      aria-label="UnFollow"
      className="px-6 py-2 text-sm transition-all border rounded-lg border-brand-100 text-brand-100 hover:bg-brand-100 hover:text-white active:bg-brand-100 "
    >
      팔로잉
    </button>
  );
}

export default UnFollowButton;
