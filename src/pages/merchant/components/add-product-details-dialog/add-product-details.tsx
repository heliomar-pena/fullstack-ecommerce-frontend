import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type {
  CategoryAttributeApi,
  ProductAttributeValueApi,
} from "../../dto/product.dto";
import { buildProductDetailsSchema } from "../../const/product-details.schema";
import { AttributeField } from "./attribute-field";
import type z from "zod";
import { buildProductDetailsDefaultValues } from "../../const/product-details.defaults";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  categoryAttributes: CategoryAttributeApi[];
  productAttributes: ProductAttributeValueApi[];
  onSave: (
    values: Record<string, string | number | boolean>,
  ) => void | Promise<void>;
  saving?: boolean;
};

export function ProductDetailsDialog({
  open,
  onOpenChange,
  title = "Product Details",
  categoryAttributes,
  productAttributes,
  onSave,
  saving = false,
}: Props) {
  const defaultValues = React.useMemo(
    () =>
      buildProductDetailsDefaultValues(categoryAttributes, productAttributes),
    [categoryAttributes, productAttributes],
  );

  const schema = React.useMemo(
    () => buildProductDetailsSchema(categoryAttributes),
    [categoryAttributes],
  );

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues,
  });

  React.useEffect(() => {
    if (!open) return;
    form.reset(defaultValues);
  }, [open, defaultValues, form]);

  const submit = async (values: FormValues) => {
    const cleaned: Record<string, string | number | boolean> = {};

    for (const [k, v] of Object.entries(values)) {
      if (v !== undefined)
        cleaned[k] = v as unknown as string | boolean | number;
    }

    await onSave(cleaned);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in the required attributes for this product.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(submit)}>
          <div className="space-y-4">
            {categoryAttributes.map((a) => (
              <AttributeField key={a.id} attribute={a} control={form.control} />
            ))}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
