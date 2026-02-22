import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "./hooks/use-users";
import type { RoleApi } from "./api/roles.api";
import type { UserApi } from "./dto/user.dto";
import { useRoles } from "./hooks/use-roles";
import { useAddUserRole } from "./hooks/use-add-user-role";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddRoleDialog } from "./components/add-role-dialog";

function formatIsoDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function getAvailableRolesForUser(
  allRoles: RoleApi[],
  user: UserApi,
): RoleApi[] {
  const userRoleNames = new Set(user.roles.map((role) => role.name));
  return allRoles.filter((role) => !userRoleNames.has(role.name));
}

const AdminPanel = () => {
  const { data: users, isLoading, error } = useUsers();
  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useRoles();
  const addUserRoleMutation = useAddUserRole();

  const [addRoleOpen, setAddRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserApi | null>(null);

  const openAddRoleDialog = (user: UserApi) => {
    setSelectedUser(user);
    setAddRoleOpen(true);
  };

  const closeAddRoleDialog = () => {
    setAddRoleOpen(false);
    setSelectedUser(null);
  };

  const availableRolesForSelectedUser = useMemo(() => {
    if (!selectedUser || !roles) return [];
    return getAvailableRolesForUser(roles, selectedUser);
  }, [roles, selectedUser]);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            All users in the system.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="text-sm text-muted-foreground">Loading...</div>
      )}

      {error && (
        <div className="text-sm text-destructive">
          Error while loading users.
        </div>
      )}

      {!isLoading && users && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[260px]">Roles</TableHead>
                <TableHead className="w-[220px]">Created At</TableHead>
                <TableHead className="w-[220px]">Updated At</TableHead>
                <TableHead className="w-[160px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-xs">
                      {user.id}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {user.roles.length === 0 ? (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        ) : (
                          user.roles.map((role) => (
                            <Badge key={role.name} variant="secondary">
                              {role.name}
                            </Badge>
                          ))
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {formatIsoDate(user.createdAt)}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {formatIsoDate(user.updatedAt)}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openAddRoleDialog(user)}
                        disabled={
                          rolesLoading ||
                          !!rolesError ||
                          addUserRoleMutation.isPending
                        }
                      >
                        Add role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedUser && (
        <AddRoleDialog
          open={addRoleOpen}
          onOpenChange={(open) => {
            setAddRoleOpen(open);
            if (!open) setSelectedUser(null);
          }}
          availableRoles={availableRolesForSelectedUser}
          saving={addUserRoleMutation.isPending}
          onSave={async ({ roleId }) => {
            await addUserRoleMutation.mutateAsync({
              userId: selectedUser.id,
              roleId,
            });
            closeAddRoleDialog();
          }}
        />
      )}
    </div>
  );
};

export default AdminPanel;
