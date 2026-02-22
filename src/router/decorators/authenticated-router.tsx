import { AuthenticatedUserLayout } from "@/layouts/authenticated-user.layout";
import { getToken } from "@/stores/authStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

export const AuthenticatedRouter = () => {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.info("You're being redirected to login...");
      navigate("/auth/login");
    }
  }, [token, navigate]);

  return (
    <AuthenticatedUserLayout>
      <Outlet />
    </AuthenticatedUserLayout>
  );
};
