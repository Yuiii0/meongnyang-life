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
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
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
  await deleteObject(imageRef);
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

export const deletePost = async (postId: string) => {
  const postRef = doc(db, "posts", postId);
  await deleteDoc(postRef);
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
  } else {
    throw new Error("포스트를 찾을 수 없습니다.");
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

// Like
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
  const likedPostsQuery = query(collection(db, `like_posts/${userId}/posts`));
  const likedPostsSnapshot = await getDocs(likedPostsQuery);
  const likedPostIds: string[] = [];

  likedPostsSnapshot.forEach((doc) => {
    likedPostIds.push(doc.id);
  });

  const posts: postDto[] = [];
  for (const postId of likedPostIds) {
    const post = await getPostByPostId(postId);
    posts.push(post as postDto);
  }

  return posts;
};
