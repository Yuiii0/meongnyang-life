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
};

export type PostFormData = {
  title: string;
  content: string;
  images: string[];
};

export type CommentDto = {
  id?: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
