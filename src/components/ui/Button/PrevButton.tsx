import { ChevronLeft } from "lucide-react";

function PrevButton({ ...props }) {
  return (
    <button className="flex items-center justify-start">
      <ChevronLeft size={20} {...props} />
    </button>
  );
}

export default PrevButton;
