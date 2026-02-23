import { toast } from "sonner";
import type { SseHandler } from "../types/sse-handler";

export const PRODUCT_DELETE_COMPLETION_KEY = "product.delete.completion";
export const handleProductDeleteCompletion: SseHandler = (
  message,
  { queryClient },
) => {
  toast.success(message as string);
  queryClient.invalidateQueries({ queryKey: ["products", "me"] });
};
