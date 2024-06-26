import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useAuth = () => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      }
      if (user?.uid !== userId) {
        navigate(-1);
      }
    }
  }, [loading, user, userId, navigate]);

  return { user, loading };
};
