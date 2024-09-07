import { Timestamp } from "firebase/firestore";

export type PostDto = {
  id?: string;
  userId: string;
  nickname: string;
  title: string;
  content: string;
  images?: PostImage[] | null;
  likeCount: number;
  commentCount: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  keywords?: string[];
};

export type PostFormData = {
  title: string;
  content: string;
  images: PostImage[];
};

export type PostImage = {
  original: string;
  small: string;
  large: string;
};
