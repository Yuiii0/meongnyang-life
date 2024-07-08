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
import { CommentDto, ReplyDto } from "./type";

// Comment

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
    likeCount: 0,
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

const deleteAllRepliesByCommentId = async (
  postId: string,
  commentId: string
) => {
  const repliesQuery = query(
    collection(db, "posts", postId, "comments", commentId, "replies")
  );
  const querySnapshot = await getDocs(repliesQuery);

  let replyCount = 0;
  const deletePromises = querySnapshot.docs.map((replyDoc) => {
    replyCount++;
    return deleteDoc(replyDoc.ref);
  });

  await Promise.all(deletePromises);

  return replyCount;
};

export const deleteComment = async (postId: string, commentId: string) => {
  const replyCount = await deleteAllRepliesByCommentId(postId, commentId);

  const commentRef = doc(db, "posts", postId, "comments", commentId);
  await deleteDoc(commentRef);

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    commentCount: increment(-(replyCount + 1)),
  });
};

// Reply
export const getRepliesByCommentId = async (
  postId: string,
  commentId: string
) => {
  const repliesQuery = query(
    collection(db, "posts", postId, "comments", commentId, "replies"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(repliesQuery);

  const replies: ReplyDto[] = [];
  querySnapshot.forEach((doc) => {
    replies.push({ id: doc.id, ...doc.data() } as ReplyDto);
  });
  return replies;
};

export const getReplyById = async (
  postId: string,
  commentId: string,
  replyId: string
) => {
  const replyRef = doc(
    db,
    "posts",
    postId,
    "comments",
    commentId,
    "replies",
    replyId
  );
  const docSnap = await getDoc(replyRef);
  if (docSnap.exists()) {
    const replyData = docSnap.data();
    return { id: docSnap.id, ...replyData } as ReplyDto;
  } else {
    throw new Error("대댓글을 찾을 수 없습니다.");
  }
};
export const createReply = async (
  postId: string,
  commentId: string,
  userId: string,
  content: string
) => {
  const repliesRef = await addDoc(
    collection(db, "posts", postId, "comments", commentId, "replies"),
    {
      userId,
      postId,
      commentId,
      content,
      likeCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );
  await updateDoc(repliesRef, {
    id: repliesRef.id,
  });
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    commentCount: increment(1),
  });
  return repliesRef.id;
};
export const updateReply = async (
  postId: string,
  commentId: string,
  replyId: string,
  content: string
) => {
  const repliesRef = doc(
    db,
    "posts",
    postId,
    "comments",
    commentId,
    "replies",
    replyId
  );
  await updateDoc(repliesRef, { content, updatedAt: Timestamp.now() });
};

export const deleteReply = async (
  postId: string,
  commentId: string,
  replyId: string
) => {
  const repliesRef = doc(
    db,
    "posts",
    postId,
    "comments",
    commentId,
    "replies",
    replyId
  );
  await deleteDoc(repliesRef);

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    commentCount: increment(-1),
  });
};
