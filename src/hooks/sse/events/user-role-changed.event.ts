import { toast } from "sonner";
import type { SseHandler } from "../types/sse-handler";

export const USER_ROLE_CHANGED_KEY = "user.role.changed";
export const handleUserRoleChanged: SseHandler = (message, { queryClient }) => {
  toast.info(message as string);
  queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
};
