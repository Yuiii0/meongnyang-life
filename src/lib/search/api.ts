import { db } from "@/shared/firebase";
import { cleaningText } from "@/utils/cleaningText";
import { createKeyWords } from "@/utils/createKeywords";
import { collection, getDocs, query, where } from "firebase/firestore";
import { postDto } from "../post/type";
import { UserProfile } from "../user/type";

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

    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile);
    });

    return users;
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
    const q = query(postRef, where("keywords", "array-contains-any", keywords));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const posts: postDto[] = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data() as postDto);
    });

    return posts;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
