import { ChevronRight } from "lucide-react";

function NextButton({ ...props }) {
  return (
    <button className="flex items-center font-semibold gap-x-1" {...props}>
      다음
      <ChevronRight size={16} />
    </button>
  );
}

export default NextButton;
