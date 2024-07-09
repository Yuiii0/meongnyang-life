import { Timestamp } from "firebase/firestore";

export type postDto = {
  id?: string;
  userId: string;
  title: string;
  content: string;
  images?: string[] | null;
  likeCount: number;
  commentCount: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  keywords: string[];
};

export type PostFormData = {
  title: string;
  content: string;
  images: string[];
};
