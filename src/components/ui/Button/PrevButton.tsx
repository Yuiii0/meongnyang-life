import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PrevButtonProps extends React.ComponentProps<typeof ChevronLeft> {
  isNavigate?: boolean;
}

function PrevButton({ isNavigate = true, ...props }: PrevButtonProps) {
  const navigate = useNavigate();

  const handleClickPrevButton = () => {
    if (isNavigate) {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClickPrevButton}
      className="flex items-center justify-start"
      aria-label="Go back"
    >
      <ChevronLeft {...props} />
    </button>
  );
}

export default PrevButton;
