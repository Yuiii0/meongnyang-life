import { Timestamp } from "firebase/firestore";

export const formatTimestamp = (timestamp: Timestamp) => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  switch (true) {
    case diff < 60000: // 1분 이내
      return "방금 전";
    case diff < 3600000: {
      // 1시간 이내
      const minutes = Math.floor(diff / 60000);
      return `${minutes}분 전`;
    }
    case diff < 86400000: {
      // 24시간 이내
      const hours = Math.floor(diff / 3600000);
      return `${hours}시간 전`;
    }
    default: {
      // 24시간 이후
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(2);
      return `${year}.${month}.${day}`;
    }
  }
};
