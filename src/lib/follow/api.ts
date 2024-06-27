import { db } from "@/api/database";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

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

const followAPI = {
  getFollowStatus,
  addFollowing,
  removeFollowing,
};
export default followAPI;
