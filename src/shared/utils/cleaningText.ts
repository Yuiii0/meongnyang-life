export const cleaningText = (text: string): string => {
  // 특수문자 및 공백 제거, 다양한 언어 지원
  const regEx = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

  const cleanText = text.replace(regEx, "").toLowerCase();

  return cleanText;
};
