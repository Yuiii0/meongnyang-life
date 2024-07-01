import { db } from "@/api/database";
import { storage } from "@/api/store/store.api";
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { postDto } from "./type";

// 이미지 Url을 생성 및 받아오는 함수
export const uploadImagesAndGetUrls = async (
  userId: string,
  images: File[]
): Promise<string[]> => {
  const imageUrls = await Promise.all(
    images.map(async (image, index) => {
      const imageRef = ref(storage, `posts/${userId}/${index + 1}`);
      const result = await uploadBytes(imageRef, image);
      return await getDownloadURL(result.ref);
    })
  );
  return imageUrls;
};

export const createPost = async (postDto: postDto) => {
  const docRef = await addDoc(collection(db, "posts"), {
    userId: postDto.userId,
    title: postDto.title,
    images: postDto.images,
    content: postDto.content,
    createdAt: postDto.createdAt,
    updatedAt: postDto.updatedAt || serverTimestamp(),
    likeCount: postDto.likeCount,
    commentCount: postDto.commentCount,
  });
  await updateDoc(docRef, { id: docRef.id });

  return docRef.id;
};

export const updatePost = async (postId: string, postDto: postDto) => {
  const docRef = doc(db, "posts", postId);
  await updateDoc(docRef, {
    ...postDto,
    updatedAt: Timestamp.now(),
  });
};

export const deletePost = async (postId: string) => {
  const docRef = doc(db, "posts", postId);
  await deleteDoc(docRef);
};

export const getAllPosts = async (
  pageParam: number | null
): Promise<DocumentData[]> => {
  const posts: DocumentData[] = [];
  const PAGE_SIZE = 3;
  let postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  if (pageParam) {
    postsQuery = query(postsQuery, startAfter(pageParam), limit(PAGE_SIZE));
  } else {
    postsQuery = query(postsQuery, limit(PAGE_SIZE));
  }

  const querySnapshot = await getDocs(postsQuery);
  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });

  return posts;
};

export const getPostByPostId = async (postId: string) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const postData = docSnap.data();
    return postData;
  } else {
    throw new Error("포스트를 찾을 수 없습니다.");
  }
};
