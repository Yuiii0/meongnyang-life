import { UserProfile } from "@/lib/user/type";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "..";

export const createUserProfile = async (
  userData: UserProfile,
  userId: string
) => {
  return await setDoc(doc(db, "users", userId), userData);
};

export const updateUserProfile = async (
  userId: string,
  updatedUserData: UserProfile
) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, updatedUserData);
};

export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const userProfileData = docSnap.data() as UserProfile;
    return userProfileData;
  }
};

// 팔로우 상태를 확인하는 함수
export const getFollowStatus = async (myUserId: string, userId: string) => {
  const followCollectionRef = collection(db, `users/${myUserId}/follow`);
  const q = query(followCollectionRef, where("to_userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
// 팔로잉을 추가하는 함수
export const addFollowing = async (myUserId: string, userId: string) => {
  const followDocRef = doc(db, `users/${myUserId}/follow`, userId);
  return await setDoc(followDocRef, {
    from_userId: myUserId,
    to_userId: userId,
    createdAt: serverTimestamp(),
  });
};
// 언팔로잉을 수행하는 함수
export const removeFollowing = async (myUserId: string, userId: string) => {
  const followDocRef = doc(db, `users/${myUserId}/follow`, userId);
  await deleteDoc(followDocRef);
};

export const userAPI = {
  createUserProfile,
  updateUserProfile,
  getUserProfile,
  getFollowStatus,
  addFollowing,
  removeFollowing,
};
export default userAPI;
