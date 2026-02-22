import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addRoleSchema, type AddRoleFormValues } from "./const/add-role.schema";
import type { RoleApi } from "../api/roles.api";
import { useEffect } from "react";

export type AddRolePayload = { roleId: number };

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableRoles: RoleApi[];
  onSave: (payload: AddRolePayload) => void | Promise<void>;
  saving?: boolean;
};

export function AddRoleDialog({
  open,
  onOpenChange,
  availableRoles,
  onSave,
  saving = false,
}: Props) {
  const form = useForm<AddRoleFormValues>({
    resolver: zodResolver(addRoleSchema),
    defaultValues: { roleId: undefined as unknown as number },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!open) return;
    form.reset({ roleId: undefined as unknown as number });
  }, [open, form]);

  const submit = async (values: AddRoleFormValues) => {
    await onSave(values);
  };

  const hasOptions = availableRoles.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add role</DialogTitle>
          <DialogDescription>
            Select a role to add to this user.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(submit)}>
          <Controller
            control={form.control}
            name="roleId"
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label>Role</Label>

                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={saving || !hasOptions}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue
                      placeholder={
                        hasOptions ? "Select a role" : "No roles available"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {availableRoles.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error?.message ? (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                ) : null}
              </div>
            )}
          />

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={saving || !hasOptions}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
