import { db } from "@/api/database";
import { storage } from "@/api/store/store.api";
import { cleaningText } from "@/utils/cleaningText";
import { createKeyWords } from "@/utils/createKeywords";
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
  images: File[],
  refPath: string,
  options: {
    maxSizeMB: number;
    maxWidthOrHeight: number;
    useWebWorker: boolean;
    fileType: string;
  } = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
  }
): Promise<string[]> => {
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      try {
        const compressedImage = await imageCompression(image, options);
        const currentTime = Date.now();
        let imageRef;

        if (refPath === "posts") {
          imageRef = ref(
            storage,
            `${refPath}/${userId}/${currentTime}_${image.name}`
          );
        } else if (refPath === "users") {
          imageRef = ref(storage, `${refPath}/${userId}`);
        } else {
          throw new Error("존재하지 않는 refPath 입니다.");
        }

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
  try {
    const cleanedTitle = cleaningText(postDto.title);
    const keywords = createKeyWords([cleanedTitle]);

    const postRef = await addDoc(collection(db, "posts"), {
      userId: postDto.userId,
      title: postDto.title,
      images: postDto.images,
      content: postDto.content,
      createdAt: postDto.createdAt,
      updatedAt: postDto.updatedAt || serverTimestamp(),
      likeCount: postDto.likeCount,
      commentCount: postDto.commentCount,
      keywords,
    });
    await updateDoc(postRef, { id: postRef.id });

    return postRef.id;
  } catch (error) {
    throw new Error("포스트 작성에 실패하였습니다");
  }
};

export const updatePost = async (postId: string, postDto: postDto) => {
  const cleanedTitle = cleaningText(postDto.title);
  const keywords = createKeyWords([cleanedTitle]);

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    ...postDto,
    keywords,
    updatedAt: Timestamp.now(),
  });
};
const deleteAllPostLikes = async (postId: string) => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));

    if (usersSnapshot.empty) {
      console.warn("유저가 존재하지 않습니다");
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
        deletePromises.push(deleteDoc(likeDoc.ref));
      });
    }

    await Promise.all(deletePromises);
  } catch (error) {
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
