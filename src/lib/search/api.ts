import { db } from "@/shared/firebase";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { PostDto } from "../post/type";
import { cleaningText } from '@/shared/utils/cleaningText';
import { createKeyWords } from '@/shared/utils/createKeywords';

export const searchUsersByNickname = async (nickname: string) => {
  try {
    const cleanedNickname = cleaningText(nickname);
    const keywords = createKeyWords([cleanedNickname]);

    const userRef = collection(db, "users");
    const q = query(userRef, where("keywords", "array-contains-any", keywords));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const userIds: string[] = [];
    querySnapshot.forEach((doc) => {
      userIds.push(doc.id);
    });

    return userIds;
  } catch (error) {
    console.warn("유저 검색에 실패하였습니다.");
    throw error;
  }
};

export const searchPostsByTitle = async (title: string) => {
  try {
    const cleanedTitle = cleaningText(title);
    const keywords = createKeyWords([cleanedTitle]);

    const postRef = collection(db, "posts");
    const q = query(
      postRef,
      where("keywords", "array-contains-any", keywords),
      orderBy("likeCount", "desc"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const posts: PostDto[] = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data() as PostDto);
    });

    return posts;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
