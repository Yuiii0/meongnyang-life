import { ChevronRight } from "lucide-react";

function NextButton({ ...props }) {
  return (
    <div className="fixed bottom-10 right-10">
      <button
        className="flex items-center justify-end font-semibold gap-x-1 "
        aria-label="Next"
        {...props}
      >
        다음
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default NextButton;
