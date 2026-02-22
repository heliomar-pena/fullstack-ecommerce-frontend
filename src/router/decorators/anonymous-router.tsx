import { getToken } from "@/stores/authStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const token = getToken();

export const AnonymousRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [navigate]);

  return <Outlet />;
};
