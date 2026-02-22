import { ROLES } from "@/auth/roles";
import { useUser } from "@/context/user/user.context";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export const MerchantRouter = () => {
  const { isLoading, user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isLoading &&
      !user?.roles?.includes(ROLES.Merchant) &&
      !user?.roles?.includes(ROLES.Admin)
    ) {
      navigate("/forbidden");
    }
  }, [isLoading, navigate, user]);

  return <Outlet />
};
