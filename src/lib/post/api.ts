import { db, storage } from "@/shared/firebase";
import { cleaningText } from "@/utils/cleaningText";
import { createKeyWords } from "@/utils/createKeywords";
import imageCompression from "browser-image-compression";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import { PostDto } from "./type";

interface UploadOptions {
  maxSizeMB: number;
  maxWidthOrHeight?: number;
  useWebWorker: boolean;
  fileType: string;
}

const uploadImage = async (
  imageRef: StorageReference,
  image: File
): Promise<string> => {
  const result = await uploadBytes(imageRef, image);
  return await getDownloadURL(result.ref);
};

const compressImage = async (
  image: File,
  options: UploadOptions
): Promise<File> => {
  return await imageCompression(image, options);
};

export const uploadImagesAndGetUrls = async (
  userId: string,
  images: File[],
  refPath: string,
  options: UploadOptions = {
    maxSizeMB: 1,
    useWebWorker: true,
    fileType: "image/webp",
  }
): Promise<(string | { original: string; small: string; large: string })[]> => {
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      try {
        const currentTime = Date.now();

        if (refPath === "users") {
          const compressedImage = await compressImage(image, options);
          const imageRef = ref(storage, `${refPath}/${userId}`);
          return await uploadImage(imageRef, compressedImage);
        } else if (refPath === "posts") {
          const largeImageOptions = { ...options, maxWidthOrHeight: 1080 };
          const smallImageOptions = { ...options, maxWidthOrHeight: 480 };

          const [compressedLargeImage, compressedSmallImage] =
            await Promise.all([
              compressImage(image, largeImageOptions),
              compressImage(image, smallImageOptions),
            ]);

          const largeImageRef = ref(
            storage,
            `${refPath}/${userId}/${currentTime}_large_${image.name}`
          );
          const smallImageRef = ref(
            storage,
            `${refPath}/${userId}/${currentTime}_small_${image.name}`
          );
          const originalImageRef = ref(
            storage,
            `${refPath}/${userId}/${currentTime}_${image.name}`
          );

          const [largeImageUrl, smallImageUrl, originalImageUrl] =
            await Promise.all([
              uploadImage(largeImageRef, compressedLargeImage),
              uploadImage(smallImageRef, compressedSmallImage),
              uploadImage(originalImageRef, image),
            ]);

          return {
            original: originalImageUrl,
            small: smallImageUrl,
            large: largeImageUrl,
          };
        } else {
          throw new Error("잘못된 접근입니다.");
        }
      } catch (error) {
        console.warn(error);
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

export const createPost = async (postDto: PostDto) => {
  try {
    const cleanedTitle = cleaningText(postDto.title);
    const keywords = createKeyWords([cleanedTitle]);

    const postRef = await addDoc(collection(db, "posts"), {
      userId: postDto.userId,
      nickname: postDto.nickname,
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

export const updatePost = async (postId: string, postDto: PostDto) => {
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
  const q = query(
    collection(db, "posts"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const posts: PostDto[] = [];
  querySnapshot.forEach((doc) => {
    posts.push(doc.data() as PostDto);
  });
  return posts;
};
