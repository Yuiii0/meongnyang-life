import { PATHS } from "@/pages/route";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface ErrorLinkButton {
  status: number;
}
function ErrorLinkButton({ status }: ErrorLinkButton) {
  const navigate = useNavigate();

  switch (status) {
    case 401:
    case 402:
      return (
        <Button onClick={() => navigate(PATHS.logIn)}>
          로그인 페이지로 이동
        </Button>
      );
    case 403:
      return (
        <Button onClick={() => navigate(PATHS.main)}>메인으로 이동</Button>
      );
    case 404:
      return (
        <Button onClick={() => navigate(PATHS.main)}>메인으로 이동</Button>
      );
    case 409:
      return (
        <Button onClick={() => navigate(PATHS.main)}>메인으로 이동</Button>
      );
    case 500:
      return (
        <Button onClick={() => navigate(PATHS.main)}>메인으로 이동</Button>
      );
    default:
      return (
        <Button onClick={() => navigate(PATHS.main)}>메인으로 이동</Button>
      );
  }
}

export default ErrorLinkButton;
