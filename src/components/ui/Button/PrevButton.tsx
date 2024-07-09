import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PrevButton({ ...props }) {
  const navigate = useNavigate();

  const handleClickPrevButton = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleClickPrevButton}
      className="flex items-center justify-start"
    >
      <ChevronLeft {...props} />
    </button>
  );
}

export default PrevButton;
