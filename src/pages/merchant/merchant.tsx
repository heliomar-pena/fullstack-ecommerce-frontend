import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useMyProducts } from "./hooks/use-my-products";
import { useProductMutations } from "./hooks/use-product-mutation";
import type { ProductDto } from "./dto/product.dto";
import { useState } from "react";
import { ProductDetailsDialog } from "./components/add-product-details";

export default function MerchantPage() {
  const { data, isLoading, error } = useMyProducts();
  const { publish, remove, addDetails } = useProductMutations();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState<ProductDto | null>(null);

  const openDetails = (product: ProductDto) => {
    setSelected(product);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelected(null);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Productos</h1>
          <p className="text-sm text-muted-foreground">Product List.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => console.log("open add product dialog")}>
            Add Product
          </Button>
          <Button
            variant="outline"
            onClick={() => console.log("open add category dialog")}
          >
            Add Category
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="text-sm text-muted-foreground">Loading...</div>
      )}
      {error && (
        <div className="text-sm text-destructive">
          Error while loading products.
        </div>
      )}

      {!isLoading && data && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">ID</TableHead>
                <TableHead className="w-[120px]">Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[110px]">Status</TableHead>
                <TableHead className="w-[180px]">Category</TableHead>
                <TableHead className="w-[160px]">Details</TableHead>
                <TableHead className="w-[210px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell className="font-mono">{p.code}</TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="max-w-[420px] truncate">
                    {p.description}
                  </TableCell>
                  <TableCell>
                    {p.isActive ? (
                      <Badge>Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>{p.categoryName}</TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDetails(p)}
                    >
                      Add Details
                    </Button>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      {!p.isActive && (
                        <Button
                          size="sm"
                          onClick={() => publish.mutate(p.id)}
                          disabled={publish.isPending}
                        >
                          Publish
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => remove.mutate(p.id)}
                        disabled={remove.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selected && (
        <ProductDetailsDialog
          open={detailsOpen}
          onOpenChange={(o) => {
            setDetailsOpen(o);
            if (!o) setSelected(null);
          }}
          title={`Details · ${selected.title}`}
          categoryAttributes={selected.categoryAttributes}
          productAttributes={selected.productAttributes}
          saving={addDetails.isPending}
          onSave={async (values) => {
            await addDetails.mutateAsync({
              productId: selected.id,
              details: values,
            });
            closeDetails();
          }}
        />
      )}
    </div>
  );
}
