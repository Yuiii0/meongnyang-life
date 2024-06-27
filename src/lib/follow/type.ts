import { Timestamp } from "firebase/firestore";

export type FollowData = {
  id: string;
  createdAt: Timestamp;
  from_userId: string;
  to_userId: string;
};
