import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CategoryAttributeApi } from "../../dto/product.dto";
import { X } from "lucide-react";

type Props = {
  selectedIds: number[];
  allAttributes: CategoryAttributeApi[] | undefined;
  onRemove: (id: number) => void;
};

export function SelectedAttributes({
  selectedIds,
  allAttributes,
  onRemove,
}: Props) {
  const byId = new Map<number, CategoryAttributeApi>(
    (allAttributes ?? []).map((attribute) => [attribute.id, attribute]),
  );

  if (selectedIds.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No attributes added yet.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {selectedIds.map((id) => {
        const attribute = byId.get(id);
        const label = attribute
          ? `${attribute.name}${attribute.unit ? ` (${attribute.unit})` : ""}`
          : `Attribute #${id}`;

        return (
          <Badge
            key={id}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <span>{label}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => onRemove(id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        );
      })}
    </div>
  );
}
