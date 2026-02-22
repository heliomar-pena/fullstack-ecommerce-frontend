import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserProvider } from "@/context/user/user.context";
import type { FC, ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

export const AuthenticatedUserLayout: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <UserProvider>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <div className="w-full">
          <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            e-commerce
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </header>
          <div className="p-4">{children}</div>
        </div>
      </SidebarProvider>
    </UserProvider>
  );
};
