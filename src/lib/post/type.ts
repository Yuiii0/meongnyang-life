import { Timestamp } from "firebase/firestore";

export type postDto = {
  userId: string;
  title: string;
  content: string;
  images?: string[] | null;
  likeCount: number;
  commentCount: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};

export type PostFormData = {
  title: string;
  content: string;
  images: string[];
};
