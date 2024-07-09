import { db } from "@/api/database";
import { cleaningText } from "@/utils/cleaningText";
import { createKeyWords } from "@/utils/createKeywords";
import { collection, getDocs, query, where } from "firebase/firestore";
import { postDto } from "../post/type";
import { UserProfile } from "../user/type";

export const searchUsersByNickname = async (nickname: string) => {
  try {
    const cleanedNickname = cleaningText(nickname);
    const userRef = collection(db, "users");
    const q = query(
      userRef,
      where("cleanedNickname", ">=", cleanedNickname),
      where("cleanedNickname", "<=", cleanedNickname + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
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
    console.log("cleanedTitle", cleanedTitle);
    console.log("keywords", keywords);

    const postRef = collection(db, "posts");
    const q = query(postRef, where("keywords", "array-contains-any", keywords));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No posts found");
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
