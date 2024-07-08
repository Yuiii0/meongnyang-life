import { Timestamp } from "firebase/firestore";

export type CommentLikeDto = {
  id: string;
  userId: string;
  postId: string;
  commentId: string;
  replyId?: string;
  createdAt: Timestamp;
  type: "COMMENT" | "REPLY";
};
