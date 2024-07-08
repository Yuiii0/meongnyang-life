import { db } from "@/api/database";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getCommentById, getReplyById } from "../comment/api";
import { getPostByPostId } from "../post/api";
import { postDto } from "../post/type";

// Posts
export const getPostLikeStatus = async (postId: string, userId: string) => {
  const likePostDocRef = doc(db, `like_posts/${userId}/posts/${postId}`);
  const docSnap = await getDoc(likePostDocRef);

  return docSnap.exists();
};

export const createPostLikeReaction = async (
  postId: string,
  userId: string
) => {
  const likePostRef = doc(db, `like_posts/${userId}/posts/${postId}`);
  await setDoc(likePostRef, {
    userId,
    postId,
    createdAt: serverTimestamp(),
  });
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    likeCount: increment(1),
  });
};
export const removePostLikeReaction = async (
  postId: string,
  userId: string
) => {
  const LikePostRef = doc(db, `like_posts/${userId}/posts/${postId}`);
  await deleteDoc(LikePostRef);

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    likeCount: increment(-1),
  });
};
export const getPostLikeCount = async (postId: string) => {
  const postRef = doc(db, "posts", postId);
  const docSnap = await getDoc(postRef);
  if (docSnap.exists()) {
    const postData = docSnap.data() as postDto;
    return postData.likeCount;
  } else {
    throw new Error("포스트를 찾을 수 없습니다.");
  }
};

export const getLikedPostsByUserId = async (userId: string) => {
  try {
    const likedPostsQuery = query(collection(db, `like_posts/${userId}/posts`));
    const likedPostsSnapshot = await getDocs(likedPostsQuery);
    const likedPostIds: string[] = [];

    likedPostsSnapshot.forEach((doc) => {
      likedPostIds.push(doc.id);
    });

    const posts: postDto[] = [];
    for (const postId of likedPostIds) {
      try {
        const post = await getPostByPostId(postId);
        if (post) {
          posts.push(post as postDto);
        }
      } catch (error) {
        alert("포스트를 찾을 수 없습니다.");
      }
    }

    return posts;
  } catch (error) {
    alert("포스트를 찾을 수 없습니다.");
    return [];
  }
};

// Comments
export const getCommentLikeStatus = async (
  commentId: string,
  userId: string,
  type: "COMMENT" | "REPLY",
  replyId?: string
) => {
  const id = type === "REPLY" ? `${commentId}_${replyId}` : `${commentId}`;
  const likeCommentRef = doc(db, `like_comments/${userId}/comments/${id}`);
  const docSnap = await getDoc(likeCommentRef);

  return docSnap.exists();
};

export const createCommentLikeReaction = async (
  postId: string,
  commentId: string,
  userId: string,
  type: "COMMENT" | "REPLY",
  replyId?: string
) => {
  const id = type === "REPLY" ? `${commentId}_${replyId}` : `${commentId}`;
  const likeCommentRef = doc(db, `like_comments/${userId}/comments/${id}`);
  await setDoc(likeCommentRef, {
    userId,
    postId,
    commentId,
    replyId,
    type,
    createdAt: serverTimestamp(),
  });
  const ref =
    type === "REPLY"
      ? doc(db, "posts", postId, "comments", commentId, "replies", replyId!)
      : doc(db, "posts", postId, "comments", commentId);
  await updateDoc(ref, {
    likeCount: increment(1),
  });
};

export const removeCommentLikeReaction = async (
  postId: string,
  commentId: string,
  userId: string,
  type: "COMMENT" | "REPLY",
  replyId?: string
) => {
  const id = type === "REPLY" ? `${commentId}_${replyId}` : `${commentId}`;
  const likeCommentRef = doc(db, `like_comments/${userId}/comments/${id}`);
  await deleteDoc(likeCommentRef);

  const ref =
    type === "REPLY"
      ? doc(db, "posts", postId, "comments", commentId, "replies", replyId!)
      : doc(db, "posts", postId, "comments", commentId);
  await updateDoc(ref, {
    likeCount: increment(-1),
  });
};
export const getCommentLikeCount = async (
  postId: string,
  commentId: string,
  type: "COMMENT" | "REPLY",
  replyId?: string
) => {
  const ref =
    type === "REPLY"
      ? doc(db, "posts", postId, "comments", commentId, "replies", replyId!)
      : doc(db, "posts", postId, "comments", commentId);

  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.likeCount;
  } else {
    throw new Error("데이터를 찾을 수 없습니다.");
  }
};

export const getLikedCommentsByUserId = async (userId: string) => {
  try {
    const likedCommentsQuery = query(
      collection(db, `like_comments/${userId}/comments`)
    );
    const likedCommentsSnapshot = await getDocs(likedCommentsQuery);
    const likedComments: any[] = [];

    for (const doc of likedCommentsSnapshot.docs) {
      const data = doc.data();
      likedComments.push({
        postId: data.postId,
        commentId: data.commentId,
        replyId: data.replyId,
        type: data.type,
      });
    }

    const comments: any[] = [];
    for (const likedComment of likedComments) {
      try {
        const { postId, commentId, replyId, type } = likedComment;
        const comment =
          type === "REPLY"
            ? await getReplyById(postId, commentId, replyId)
            : await getCommentById(postId, commentId);
        if (comment) {
          comments.push(comment);
        } else {
          alert(
            `댓글을 찾을 수 없습니다. 게시물 ID: ${postId}, 댓글 ID: ${commentId}, 답글 ID: ${replyId}`
          );
        }
      } catch (error) {
        alert(`댓글을 가져오는 중 오류가 발생하였습니다.`);
      }
    }

    return comments;
  } catch (error) {
    alert("좋아요한 댓글을 가져오는 중 오류가 발생하였습니다.");
    return [];
  }
};
