import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { authErrorMessages } from "./authErrorMessages";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (error instanceof FirebaseError) {
      alert(authErrorMessages[error.code] || "로그인에 실패하였습니다.");
    } else {
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  }
};
