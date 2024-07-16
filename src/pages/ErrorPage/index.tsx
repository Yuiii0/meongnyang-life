import { Button } from "@/components/ui/Button";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import getErrorMessage from "@/utils/getErrorMessage";
import { useNavigate, useRouteError } from "react-router-dom";
import { PATHS } from "../route";

function ErrorPage() {
  const error: any = useRouteError();

  const { title, content } = getErrorMessage(error.status);
  const navigate = useNavigate();

  return (
    <Page>
      <SEOMetaTag
        description="요청하신 페이지를 찾을 수 없습니다. 다른 반려동물 관련 콘텐츠를 찾아보세요."
        keywords="404, 페이지를 찾을 수 없습니다, 반려동물"
        url={window.location.href}
      />
      <div className="flex flex-col items-center gap-y-4">
        <div className="w-56">
          <img
            src={"/images/dog_cat.webp"}
            width={224}
            height={224}
            alt="logo_cats_dogs"
          />
        </div>
        <div className="text-4xl font-bold">{error.status}</div>
        <div className="mb-2 text-center">
          <h1 className="mb-6 text-lg font-semibold text-gray-700">{title}</h1>
          <p className="text-sm text-gray-500 whitespace-pre-wrap">{content}</p>
        </div>
        <Button onClick={() => navigate(PATHS.main)}>메인으로 이동</Button>
      </div>
    </Page>
  );
}

export default ErrorPage;
