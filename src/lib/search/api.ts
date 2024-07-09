import { db } from "@/api/database";
import { cleaningText } from "@/utils/cleaningText";
import { collection, getDocs, query, where } from "firebase/firestore";
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
