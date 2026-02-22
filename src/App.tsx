import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { mclsx } from "./utils/clsx";
import styles from "./App.module.css";
import { Toaster } from "./components/ui/sonner";

const clsx = mclsx(styles);

function App() {
  return (
    <div className={clsx("App")}>
      <RouterProvider router={router} />;
      <Toaster richColors />
    </div>
  );
}

export default App;
