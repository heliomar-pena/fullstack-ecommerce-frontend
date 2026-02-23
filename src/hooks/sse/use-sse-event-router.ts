import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { sseHandlers, type SseEnvelope } from "./handlers/sse-handlers";

export function useSseEventRouter() {
  const queryClient = useQueryClient();

  return useCallback(
    (evt: SseEnvelope) => {
      const handler = sseHandlers[evt.eventType];

      if (!handler) {
        console.debug("No handler for event type:", evt.eventType);
        return;
      }

      handler(evt.message, {
        queryClient,
      });
    },
    [queryClient],
  );
}
