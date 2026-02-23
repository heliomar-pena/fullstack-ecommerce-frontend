import {
  handleProductDeleteCompletion,
  PRODUCT_DELETE_COMPLETION_KEY,
} from "../events/product-delete-completion.event";
import type { SseHandler } from "../types/sse-handler";
import {
  handleUserRoleChanged,
  USER_ROLE_CHANGED_KEY,
} from "../events/user-role-changed.event";

export type SseEnvelope = {
  eventType: string;
  message: unknown;
};

export const sseHandlers: Record<string, SseHandler> = {
  [PRODUCT_DELETE_COMPLETION_KEY]: handleProductDeleteCompletion,
  [USER_ROLE_CHANGED_KEY]: handleUserRoleChanged,
};
