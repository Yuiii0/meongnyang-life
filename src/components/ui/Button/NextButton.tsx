import { ChevronRight } from "lucide-react";

function NextButton({ ...props }) {
  return (
    <button
      className="flex items-center justify-end font-semibold gap-x-1 "
      aria-label="Next"
      {...props}
    >
      다음
      <ChevronRight size={16} />
    </button>
  );
}

export default NextButton;
