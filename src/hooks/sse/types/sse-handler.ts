import type { QueryClient } from "@tanstack/react-query";

export type SseHandlerContext = {
  queryClient: QueryClient;
};

export type SseHandler = (data: unknown, ctx: SseHandlerContext) => void;
