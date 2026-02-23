import { hasAnyRole } from "@/auth/permissions";
import { ROLES } from "@/auth/roles";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user/user.context";
import styles from "./home.module.css";
import { mclsx } from "@/utils/clsx";

const clsx = mclsx(styles);

export const Home = () => {
  const { user, logout } = useUser();

  const isAdmin = hasAnyRole(user?.roles, [ROLES.Admin]);
  const isMerchant = hasAnyRole(user?.roles, [ROLES.Merchant]);

  return (
    <div className={clsx("Home")}>
      <h1 className={clsx("Home__title")}>Welcome</h1>
      <p>Greetings {user?.email}!.</p>

      {!isAdmin && !isMerchant && (
        <>
          <p>
            Thanks for joining to the waitlist. Customer's platform are yet
            under development. We will send you an email when the platform is
            ready to start buying!.
          </p>
          <p>
            If you're a admin or merchant, please check your account have the
            enough permissions to visit this page. Ask a admin to increase your
            permission or log out and log in in admin account.
          </p>
          <Button onClick={logout}>Log out</Button>
        </>
      )}

      {(isMerchant || isAdmin) && (
        <>
          <p>
            Here, you'll be able to create categories and products for your
            catalog.
          </p>
          <p>
            Try using the sidebar to navigate through the different pages of the
            platform.
          </p>
          <p>
            We are working to improve. In the future, you'll be able to create
            and handle your inventory from here.
          </p>
        </>
      )}

      {isAdmin && (
        <>
          <p>As admin, you can also modify user's permissions</p>
        </>
      )}
    </div>
  );
};

export default Home;
