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
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCategories } from "../../hooks/use-categories";
import {
  createProductSchema,
  type CreateProductFormValues,
} from "./const/create-product.schema";
import { CategoryAttributesPreview } from "./category-attributes-preview";
import type { CategoryApi } from "../../api/categories.api";

export type CreateProductPayload = {
  categoryId: number;
  title: string;
  code: string;
  description: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: CreateProductPayload) => void | Promise<void>;
  saving?: boolean;
};

function findSelectedCategory(
  categories: CategoryApi[] | undefined,
  categoryId: number | undefined,
) {
  if (!categories || !categoryId) return null;
  return categories.find((category) => category.id === categoryId) ?? null;
}

export function CreateProductDialog({
  open,
  onOpenChange,
  onSave,
  saving = false,
}: Props) {
  const { data: categories, isLoading, error } = useCategories();

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      categoryId: undefined as unknown as number,
      title: "",
      code: "",
      description: "",
    },
    mode: "onSubmit",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedCategoryId = form.watch("categoryId");
  const selectedCategory = React.useMemo(
    () => findSelectedCategory(categories, selectedCategoryId),
    [categories, selectedCategoryId],
  );

  React.useEffect(() => {
    if (!open) return;
    form.reset({
      categoryId: undefined as unknown as number,
      title: "",
      code: "",
      description: "",
    });
  }, [open, form]);

  const submit = async (values: CreateProductFormValues) => {
    await onSave(values);
  };

  const busy = saving;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Create a new product.</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(submit)}>
          <div className="space-y-2">
            <Label>Category</Label>

            {isLoading ? (
              <div className="text-sm text-muted-foreground">
                Loading categories...
              </div>
            ) : error ? (
              <div className="text-sm text-destructive">
                Error loading categories.
              </div>
            ) : (
              <Controller
                control={form.control}
                name="categoryId"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                      disabled={busy}
                    >
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {(categories ?? []).map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
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
            )}
          </div>

          {selectedCategory ? (
            <div className="space-y-2">
              <Label className="text-sm">Category attributes (read-only)</Label>
              <CategoryAttributesPreview
                attributes={selectedCategory.attributes}
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <Label>Title</Label>
            <Input {...form.register("title")} disabled={busy} />
            {form.formState.errors.title?.message ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>Code</Label>
            <Input {...form.register("code")} disabled={busy} />
            {form.formState.errors.code?.message ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.code.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea {...form.register("description")} disabled={busy} />
            {form.formState.errors.description?.message ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={busy}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={busy || isLoading || !!error}>
              {saving ? "Saving..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
