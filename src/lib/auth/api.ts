import { auth } from "@/shared/firebase";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const emailSignUp = async (
  email: string,
  password: string,
  name: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  await updateProfile(user, { displayName: name });
  return user;
};

export const emailLogin = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  return user;
};

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return user;
};

export const logOut = async () => {
  await signOut(auth);
};

export const withdrawalUser = async (user: User) => {
  if (user) {
    await deleteUser(user);
    alert("그동안 멍냥생활을 이용해주셔서 감사합니다.");
    return true;
  }
};

export const authStateChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
