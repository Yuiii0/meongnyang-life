import { db } from "@/api/database";
import { storage } from "@/api/store/store.api";
import imageCompression from "browser-image-compression";
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
  where,
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
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/jpeg",
      };
      try {
        const compressedImage = await imageCompression(image, options);
        const currentTime = Date.now();
        const imageRef = ref(
          storage,
          `posts/${userId}/${currentTime}_${image.name}`
        );
        const result = await uploadBytes(imageRef, compressedImage);
        return await getDownloadURL(result.ref);
      } catch (error) {
        alert(error);
        throw error;
      }
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
    throw new Error("스토리지 삭제에 실패하였습니다.");
  }
};

export const createPost = async (postDto: postDto) => {
  const postRef = await addDoc(collection(db, "posts"), {
    userId: postDto.userId,
    title: postDto.title,
    images: postDto.images,
    content: postDto.content,
    createdAt: postDto.createdAt,
    updatedAt: postDto.updatedAt || serverTimestamp(),
    likeCount: postDto.likeCount,
    commentCount: postDto.commentCount,
  });
  await updateDoc(postRef, { id: postRef.id });

  return postRef.id;
};

export const updatePost = async (postId: string, postDto: postDto) => {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    ...postDto,
    updatedAt: Timestamp.now(),
  });
};

// 모든 사용자의 like_posts 컬렉션에서 특정 포스트 ID의 좋아요 정보를 삭제하는 함수
const deleteAllPostLikes = async (postId: string) => {
  try {
    // 모든 사용자 문서를 가져옴
    const usersSnapshot = await getDocs(collection(db, "users"));

    if (usersSnapshot.empty) {
      console.log("No users found.");
      return;
    }

    const deletePromises: Promise<void>[] = [];

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const likePostsQuery = query(
        collection(db, `like_posts/${userId}/posts`),
        where("postId", "==", postId)
      );
      const likePostsSnapshot = await getDocs(likePostsQuery);

      likePostsSnapshot.forEach((likeDoc) => {
        console.log("Deleting likeDoc with path:", likeDoc.ref.path);
        deletePromises.push(deleteDoc(likeDoc.ref));
      });
    }

    await Promise.all(deletePromises);
    console.log("All like documents deleted successfully.");
  } catch (error) {
    console.error("Failed to delete post likes: ", error);
    throw new Error("포스트 좋아요 정보를 삭제하는 데 실패하였습니다.");
  }
};

export const deletePost = async (postId: string) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error("포스트를 찾을 수 없습니다.");
    }

    // 포스트에 대한 모든 좋아요 정보 삭제
    await deleteAllPostLikes(postId);

    // 포스트 삭제
    await deleteDoc(postRef);
  } catch (error) {
    throw new Error("포스트 삭제에 실패하였습니다.");
  }
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
  const postRef = doc(db, "posts", postId);
  const docSnap = await getDoc(postRef);
  if (docSnap.exists()) {
    const postData = docSnap.data();
    return postData;
  }
};

export const getPostsByUserId = async (userId: string) => {
  const q = query(collection(db, "posts"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const posts: postDto[] = [];
  querySnapshot.forEach((doc) => {
    posts.push(doc.data() as postDto);
  });
  return posts;
};
