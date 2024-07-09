import { cleaningText } from "./cleaningText";

export const createKeyWords = (texts: string[]) => {
  const keywords = new Set<string>();

  texts.forEach((text) => {
    const cleanText = cleaningText(text);
    const length = cleanText.length;

    // 모든 가능한 2글자 이상, 10글자 이하의 부분 문자열을 생성
    for (let i = 0; i < length; i++) {
      let temp = "";
      for (let j = i; j < length && j < i + 10; j++) {
        temp += cleanText[j];
        if (temp.length >= 2) {
          keywords.add(temp);
        }
      }
    }

    return Array.from(keywords);
  });
};
