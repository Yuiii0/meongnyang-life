import { db } from "@/api/database";
import { storage } from "@/api/store/store.api";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { postDto } from "./type";

// 이미지 url 생성 및 받아오는 함수
export const uploadImagesAndGetUrls = async (
  userId: string,
  images: File[]
): Promise<string[]> => {
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const currentTime = Date.now();
      const imageRef = ref(
        storage,
        `posts/${userId}/${currentTime}_${image.name}`
      );
      const result = await uploadBytes(imageRef, image);
      return await getDownloadURL(result.ref);
    })
  );
  return imageUrls;
};

// storage에서 이미지를 삭제하는 함수
export const removeImageFromStorage = async (url: string) => {
  const imageRef = ref(storage, url);
  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.log("storage 삭제 실패", error);
  }
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

export const getPost = async (postId: string) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const postData = docSnap.data();
    return postData;
  } else {
    throw new Error("포스트를 찾을 수 없습니다.");
  }
};

export const getPostAllPosts = async () => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
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
