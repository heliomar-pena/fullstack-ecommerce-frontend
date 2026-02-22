import { Controller, type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { CategoryAttributeApi } from "../../dto/product.dto";

type Props = {
  attribute: CategoryAttributeApi;
  control: Control<Record<string, unknown>, Record<string, unknown>>;
};

export function AttributeField({ attribute, control }: Props) {
  const name = attribute.name as keyof Record<
    string,
    string | number | boolean
  >;

  if (attribute.type === "boolean") {
    return (
      <div className="flex items-center justify-between gap-3 rounded-md border p-3">
        <div className="space-y-0.5">
          <Label className="text-sm">{attribute.name}</Label>
          {attribute.unit ? (
            <div className="text-xs text-muted-foreground">
              {attribute.unit}
            </div>
          ) : null}
        </div>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={Boolean(field.value)}
              onCheckedChange={(v) => field.onChange(Boolean(v))}
            />
          )}
        />
      </div>
    );
  }

  const inputType = attribute.type === "number" ? "number" : "text";

  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{attribute.name}</Label>

      <div className="flex items-center gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex w-full items-center gap-2">
              <Input
                type={inputType}
                value={(field.value as string) ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                aria-invalid={fieldState.invalid}
              />
              {attribute.unit ? (
                <span className="min-w-[48px] text-xs text-muted-foreground">
                  {attribute.unit}
                </span>
              ) : null}
            </div>
          )}
        />
      </div>
    </div>
  );
}
