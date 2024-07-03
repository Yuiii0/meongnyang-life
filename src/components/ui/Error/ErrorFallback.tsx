import { PATHS } from "@/pages/route";
import getErrorMessage from "@/utils/getErrorMessage";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface FallbackProps {
  error: AxiosError;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const status =
    error.response && error.response.status
      ? error.response.status
      : "Unknown status";
  const navigate = useNavigate();
  const { title, content } = getErrorMessage(status);
  const isNotAuthorized = status === 401 || status === 403;
  const buttonMessage = isNotAuthorized ? "로그인" : "새로고침";

  const handleClickErrorHandler = () => {
    if (isNotAuthorized) {
      navigate(PATHS.logIn);
    } else {
      resetErrorBoundary();
    }
  };
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <button type="button" onClick={handleClickErrorHandler}>
        {buttonMessage}
      </button>
    </div>
  );
}

export default ErrorFallback;
