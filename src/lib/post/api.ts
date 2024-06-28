import { db } from "@/api/database";
import { storage } from "@/api/store/store.api";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { postData, postDto } from "./type";

// 이미지 Url을 생성 및 받아오는 함수
const uploadImagesAndGetUrls = async (
  userId: string,
  postId: string,
  images: File[]
): Promise<string[]> => {
  const imageUrls = await Promise.all(
    images.map(async (image, index) => {
      const imageRef = ref(storage, `posts/${userId}/${postId}/${index + 1}`);
      const result = await uploadBytes(imageRef, image);
      return await getDownloadURL(result.ref);
    })
  );
  return imageUrls;
};

export const createPost = async (userId: string, postDto: postDto) => {
  const docRef = await addDoc(collection(db, "posts"), {
    userId: postDto.userId,
    title: postDto.title,
    content: postDto.content,
    createdAt: postDto.createdAt,
    updatedAt: postDto.updatedAt || serverTimestamp(),
    likeCount: postDto.likeCount,
    commentCount: postDto.commentCount,
  });
  await updateDoc(docRef, { id: docRef.id });

  // 업로드할 이미지 url 생성
  if (postDto.images && postDto.images.length > 0) {
    const imageUrls = await uploadImagesAndGetUrls(
      userId,
      docRef.id,
      postDto.images
    );

    await updateDoc(docRef, {
      images: imageUrls,
    });
  }
};

export const getPost = async (postId: string) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const postData = docSnap.data() as postData;
    return postData;
  } else {
    throw new Error("포스트를 찾을 수 없습니다.");
  }
};

export const updatePost = async (postId: string, postDto: postDto) => {
  const docRef = doc(db, "posts", postId);
  if (postDto.images && postDto.images.length > 0) {
    const imageUrls = await uploadImagesAndGetUrls(
      postDto.userId,
      docRef.id,
      postDto.images
    );
    await updateDoc(docRef, {
      ...postDto,
      images: imageUrls,
      updatedAt: serverTimestamp(),
    });
  } else {
    await updateDoc(docRef, {
      ...postDto,
      updatedAt: serverTimestamp(),
    });
  }
};

export const deletePost = async (postId: string) => {
  const docRef = doc(db, "posts", postId);
  await deleteDoc(docRef);
};

const postAPI = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};

export default postAPI;
