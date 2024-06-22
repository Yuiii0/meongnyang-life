import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase";
import { authErrorMessages } from "./authErrorMessages";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const emailSignUp = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateProfile(user, { displayName: name });
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      alert(authErrorMessages[error.code] || "회원가입에 실패하였습니다.");
    } else {
      alert("오류가 발생했습니다. 다시 시도해주세요");
    }
  }
};

export const emailLogin = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      alert(authErrorMessages[error.code] || "로그인에 실패하였습니다.");
    } else {
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  }
};

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      alert(authErrorMessages[error.code] || "로그인에 실패하였습니다.");
    } else {
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    alert("로그아웃 되었습니다");
  } catch (error) {
    if (error instanceof FirebaseError) {
      alert(error.code || "로그아웃에 실패하였습니다.");
    } else {
      alert("오류가 발생했습니다. 다시 시도해주세요");
    }
    throw error;
  }
};

export const withdrawalUser = async (user: User) => {
  try {
    if (user) {
      await deleteUser(user);
      alert("그동안 멍냥생활을 이용해주셔서 감사합니다.");
      return true;
    }
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요");
  }
};

export const authStateChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
