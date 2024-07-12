import { db } from "@/shared/firebase";
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
export const getFollowStatus = async (
  myUserId: string,
  userId: string
): Promise<boolean> => {
  const followCollectionRef = collection(db, `users/${myUserId}/following`);
  const q = query(followCollectionRef, where("to_userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
// 팔로잉을 추가하는 함수
export const addFollowing = async (myUserId: string, userId: string) => {
  const myDocRef = doc(db, `users/${myUserId}/following`, userId);
  const userDocRef = doc(db, `users/${userId}/follower`, myUserId);
  await setDoc(myDocRef, {
    from_userId: myUserId,
    to_userId: userId,
    createdAt: serverTimestamp(),
  });
  await setDoc(userDocRef, {
    from_userId: myUserId,
    to_userId: userId,
    createdAt: serverTimestamp(),
  });
};
// 언팔로잉을 수행하는 함수
export const removeFollowing = async (myUserId: string, userId: string) => {
  const myDocRef = doc(db, `users/${myUserId}/following`, userId);
  const userDocRef = doc(db, `users/${userId}/follower`, myUserId);
  await deleteDoc(myDocRef);
  await deleteDoc(userDocRef);
};
// 팔로잉 리스트를 가져오는 함수
export const getFollowings = async (userId: string): Promise<string[]> => {
  const followingCollectionRef = collection(db, `/users/${userId}/following`);
  const q = query(followingCollectionRef);
  const querySnapshot = await getDocs(q);
  const followings = querySnapshot.docs.map((doc) => {
    return doc.id;
  });
  return followings;
};

// 팔로워 리스트를 가져오는 함수
export const getFollowers = async (userId: string): Promise<string[]> => {
  const followerCollectionRef = collection(db, `users/${userId}/follower`);
  const q = query(followerCollectionRef);
  const querySnapshot = await getDocs(q);
  const followers = querySnapshot.docs.map((doc) => {
    return doc.id;
  });
  return followers;
};

const followAPI = {
  getFollowStatus,
  addFollowing,
  removeFollowing,
  getFollowings,
  getFollowers,
};
export default followAPI;
