import { db } from "@/api/database";

import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { CommentDto } from './type';

export const getCommentsByPostId = async (
  postId: string,
  pageParam: number | null
): Promise<DocumentData[]> => {
  const PAGE_SIZE = 5;
  const comments: DocumentData[] = [];
  let commentsQuery = query(
    collection(db, "posts", postId, "comments"),
    orderBy("createdAt", "desc")
  );

  if (pageParam) {
    commentsQuery = query(
      commentsQuery,
      startAfter(pageParam),
      limit(PAGE_SIZE)
    );
  } else {
    commentsQuery = query(commentsQuery, limit(PAGE_SIZE));
  }

  const querySnapshot = await getDocs(commentsQuery);
  querySnapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() } as CommentDto);
  });

  return comments;
};
export const getCommentById = async (postId: string, commentId: string) => {
  const commentRef = doc(db, "posts", postId, "comments", commentId);
  const docSnap = await getDoc(commentRef);
  if (docSnap.exists()) {
    const commentData = docSnap.data();
    return { id: docSnap.id, ...commentData } as CommentDto;
  } else {
    throw new Error("댓글을 찾을 수 없습니다.");
  }
};

export const createComment = async (
  postId: string,
  userId: string,
  content: string
) => {
  const commentRef = await addDoc(collection(db, "posts", postId, "comments"), {
    userId,

    postId,
    content,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await updateDoc(commentRef, {
    id: commentRef.id,
  });
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    commentCount: increment(1),
  });

  return commentRef.id;
};

export const updateComment = async (
  postId: string,
  commentId: string,
  content: string
) => {
  const commentRef = doc(db, "posts", postId, "comments", commentId);
  await updateDoc(commentRef, { content, updatedAt: Timestamp.now() });
};

export const deleteComment = async (postId: string, commentId: string) => {
  const commentRef = doc(db, "posts", postId, "comments", commentId);
  await deleteDoc(commentRef);

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    commentCount: increment(-1),
  });
};
