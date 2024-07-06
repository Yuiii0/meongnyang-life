import { Timestamp } from "firebase/firestore";

export type CommentDto = {
  id?: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type ReplyDto = CommentDto & {
  commentId: string;
};
