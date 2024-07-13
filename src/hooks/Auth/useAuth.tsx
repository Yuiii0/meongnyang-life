import { PATHS } from "@/pages/route";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { User } from "firebase/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type CheckPermission = (user: User) => boolean;

export const useAuth = (checkPermission: CheckPermission) => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(PATHS.logIn);
      } else if (checkPermission && !checkPermission(user)) {
        toast.error("접근 권한이 없습니다.");
        navigate(-1);
      }
    }
  }, [loading, user, navigate, checkPermission]);

  return { user, loading };
};
