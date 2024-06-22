import { ChevronLeft } from "lucide-react";

function PrevButton({ ...props }) {
  return (
    <button>
      <ChevronLeft size={16} {...props} />
    </button>
  );
}

export default PrevButton;
