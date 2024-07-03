const getErrorMessage = (status: number | string) => {
  // 문자열일 경우 default 메시지로 리턴
  if (typeof status === "string") {
    return {
      title: "서비스에 접속할 수 없습니다.",
      content: "새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.",
    };
  }

  switch (status) {
    case 400:
      return {
        title: "잘못된 요청입니다.",
        content: "요청한 내용을 다시 확인해 주세요.",
      };
    case 401:
    case 402:
      return {
        title: "접근 권한이 없습니다.",
        content: "로그인을 해주세요.",
      };
    case 403:
      return {
        title: "금지된 요청입니다.",
        content: "이 리소스에 접근할 권한이 없습니다.",
      };
    case 404:
      return {
        title: "페이지를 찾을 수 없습니다.",
        content: "요청한 페이지가 존재하지 않습니다.",
      };
    case 409:
      return {
        title: "충돌이 발생했습니다.",
        content: "요청한 작업이 서버의 상태와 충돌합니다.",
      };
    case 500:
      return {
        title: "서버 오류입니다.",
        content:
          "서비스에 접속할 수 없습니다. 새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.",
      };
    default:
      return {
        title: "서비스에 접속할 수 없습니다.",
        content: "새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.",
      };
  }
};

export default getErrorMessage;
