import { db } from "@/api/database";
import { cleaningText } from "@/utils/cleaningText";
import { createKeyWords } from "@/utils/createKeywords";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserProfile } from "./type";

export const createUserProfile = async (
  userData: UserProfile,
  userId: string
) => {
  const cleanedNickname = cleaningText(userData.nickName);
  const keywords = createKeyWords([cleanedNickname]);
  return await setDoc(doc(db, "users", userId), {
    ...userData,
    keywords,
  });
};

export const updateUserProfile = async (
  userId: string,
  userData: UserProfile
) => {
  const cleanedNickname = cleaningText(userData.nickName);
  const keywords = createKeyWords([cleanedNickname]);

  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    ...userData,
    keywords,
  });
};

export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const userProfileData = docSnap.data() as UserProfile;
    return userProfileData;
  }
};
