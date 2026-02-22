import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAttributes, useCreateAttribute } from "../../hooks/use-attributes";
import { SelectedAttributes } from "./selected-attribute";
import {
  categorySchema,
  type CategoryFormValues,
} from "./const/add-category.schema";
import type { AttributeType } from "../../const/attribute-type";
import {
  newAttributeSchema,
  type NewAttributeFormValues,
} from "./const/add-attribute.schema";

export type AddCategoryPayload = {
  name: string;
  attributes: number[];
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: AddCategoryPayload) => void | Promise<void>;
  saving?: boolean;
};

export function AddCategoryDialog({
  open,
  onOpenChange,
  onSave,
  saving = false,
}: Props) {
  const {
    data: attributes,
    isLoading: attrsLoading,
    error: attrsError,
  } = useAttributes();
  const createAttr = useCreateAttribute();

  const [selectedAttributeId, setSelectedAttributeId] = React.useState<
    number | null
  >(null);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const categoryForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
    mode: "onSubmit",
  });

  const newAttrForm = useForm<NewAttributeFormValues>({
    resolver: zodResolver(newAttributeSchema),
    defaultValues: { name: "", type: "string", unit: "" },
    mode: "onSubmit",
  });

  React.useEffect(() => {
    if (!open) return;
    setSelectedIds([]);
    setSelectedAttributeId(null);
    categoryForm.reset({ name: "" });
    newAttrForm.reset({ name: "", type: "string", unit: "" });
  }, [open, categoryForm, newAttrForm]);

  const addExisting = () => {
    if (!selectedAttributeId) return;
    setSelectedIds((prev) =>
      prev.includes(selectedAttributeId)
        ? prev
        : [...prev, selectedAttributeId],
    );
  };

  const removeSelected = (id: number) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const onCreateAndAdd = async (values: NewAttributeFormValues) => {
    const res = await createAttr.mutateAsync({
      name: values.name.trim(),
      type: values.type as AttributeType,
      unit: (values.unit ?? "").trim(),
    });

    setSelectedIds((prev) =>
      prev.includes(res.id) ? prev : [...prev, res.id],
    );
    newAttrForm.reset({ name: "", type: values.type, unit: "" });
  };

  const onSaveCategory = async (values: CategoryFormValues) => {
    await onSave({
      name: values.name.trim(),
      attributes: selectedIds,
    });
  };

  const busy = saving || createAttr.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a category and select which attributes it requires.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <form
            id="category-form"
            className="space-y-2"
            onSubmit={categoryForm.handleSubmit(onSaveCategory)}
          >
            <Label>Category name</Label>
            <Input
              {...categoryForm.register("name")}
              aria-invalid={!!categoryForm.formState.errors.name}
              placeholder="Electronics"
              disabled={busy}
            />
            {categoryForm.formState.errors.name?.message ? (
              <p className="text-sm text-destructive">
                {categoryForm.formState.errors.name.message}
              </p>
            ) : null}
          </form>

          <Separator />

          <div className="space-y-2">
            <Label>Selected attributes</Label>
            <SelectedAttributes
              selectedIds={selectedIds}
              allAttributes={attributes}
              onRemove={removeSelected}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="text-sm font-medium">Add existing attribute</div>

            {attrsLoading ? (
              <div className="text-sm text-muted-foreground">
                Loading attributes…
              </div>
            ) : attrsError ? (
              <div className="text-sm text-destructive">
                Error loading attributes.
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Select
                  value={selectedAttributeId ? String(selectedAttributeId) : ""}
                  onValueChange={(v) => setSelectedAttributeId(Number(v))}
                  disabled={busy}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an attribute" />
                  </SelectTrigger>
                  <SelectContent>
                    {(attributes ?? []).map((a) => (
                      <SelectItem key={a.id} value={String(a.id)}>
                        {a.name} · {a.type}
                        {a.unit ? ` · ${a.unit}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addExisting}
                  disabled={!selectedAttributeId || busy}
                >
                  Add
                </Button>
              </div>
            )}
          </div>

          <Separator />

          <form
            id="new-attribute-form"
            className="space-y-3"
            onSubmit={newAttrForm.handleSubmit(onCreateAndAdd)}
          >
            <div className="text-sm font-medium">Create new attribute</div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2 space-y-2">
                <Label>Name</Label>
                <Input
                  {...newAttrForm.register("name")}
                  aria-invalid={!!newAttrForm.formState.errors.name}
                  placeholder="Water Proof"
                  disabled={busy}
                />
                {newAttrForm.formState.errors.name?.message ? (
                  <p className="text-sm text-destructive">
                    {newAttrForm.formState.errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Controller
                  control={newAttrForm.control}
                  name="type"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="string">string</SelectItem>
                          <SelectItem value="number">number</SelectItem>
                          <SelectItem value="boolean">boolean</SelectItem>
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
                {newAttrForm.formState.errors.type?.message ? (
                  <p className="text-sm text-destructive">
                    {newAttrForm.formState.errors.type.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Unit (optional)</Label>
              <Input
                {...newAttrForm.register("unit")}
                placeholder="kg / cm / px"
                disabled={busy}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button type="submit" variant="outline" disabled={busy}>
                {createAttr.isPending ? "Creating..." : "Create & Add"}
              </Button>
              {createAttr.isError ? (
                <p className="text-sm text-destructive">
                  Error creating attribute.
                </p>
              ) : null}
            </div>
          </form>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={busy}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              form="category-form"
              disabled={busy || selectedIds.length === 0}
            >
              {saving ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
