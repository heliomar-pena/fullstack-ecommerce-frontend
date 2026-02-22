import * as React from "react";
import { NavLink, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { SIDEBAR_NAV } from "@/router/const/sidebar-router";
import { hasAnyRole } from "@/auth/permissions";
import { useUser } from "@/context/user/user.context";

function isPathActive(pathname: string, to: string, end?: boolean) {
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(to + "/");
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const { user, logout } = useUser();

  const userRoles = user?.roles;

  const groups = React.useMemo(() => {
    return SIDEBAR_NAV.filter((g) => {
      if (!g.allowedRoles) return !!user;
      return hasAnyRole(userRoles, g.allowedRoles);
    });
  }, [user, userRoles]);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-3 py-2">
        <div className="text-sm font-semibold">My App</div>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.key}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isPathActive(pathname, item.to, item.end);

                  return (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton asChild isActive={active}>
                        <NavLink to={item.to} end={item.end}>
                          {Icon ? <Icon className="mr-2 size-4" /> : null}
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {user && (
        <SidebarFooter className="px-2 py-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout} className="text-destructive">
                <LogOut className="mr-2 size-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}
