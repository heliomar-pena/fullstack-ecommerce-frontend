import { Badge } from "@/components/ui/badge";
import type { CategoryAttributeApi } from "../../dto/product.dto";

type Props = {
  attributes: CategoryAttributeApi[];
};

export function CategoryAttributesPreview({ attributes }: Props) {
  if (attributes.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        This category has no attributes.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {attributes.map((attribute) => (
        <Badge key={attribute.id} variant="secondary">
          {attribute.name}
          {attribute.unit ? ` (${attribute.unit})` : ""}
          <span className="ml-1 text-muted-foreground">· {attribute.type}</span>
        </Badge>
      ))}
    </div>
  );
}
