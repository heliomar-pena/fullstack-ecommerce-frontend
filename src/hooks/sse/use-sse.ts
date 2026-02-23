import { useEffect, useMemo, useRef, useState, useEffectEvent } from "react";
import {
  fetchEventSource,
  type EventSourceMessage,
} from "@microsoft/fetch-event-source";

type ReadyState = 0 | 1 | 2;

type UseSSEOptions = {
  url: string;
  enabled?: boolean;
  headers?: Record<string, string>;
  method?: string;
  body?: string | FormData;
  openWhenHidden?: boolean;
  onOpen?: (res: Response) => void;
  onMessage?: (msg: EventSourceMessage) => void;
  onError?: (err: unknown) => void;
};

export function useSSE({
  url,
  enabled = true,
  headers,
  method = "GET",
  body,
  openWhenHidden = false,
  onOpen,
  onMessage,
  onError,
}: UseSSEOptions) {
  const [internalReadyState, setInternalReadyState] = useState<ReadyState>(0);
  const controllerRef = useRef<AbortController | null>(null);

  const handleOpen = useEffectEvent((res: Response) => onOpen?.(res));
  const handleMessage = useEffectEvent((msg: EventSourceMessage) =>
    onMessage?.(msg),
  );
  const handleError = useEffectEvent((err: unknown) => onError?.(err));

  const stableHeaders = useMemo(() => headers, [headers]);
  const stableBody = useMemo(() => body, [body]);

  useEffect(() => {
    if (!enabled) {
      controllerRef.current?.abort();
      controllerRef.current = null;
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    fetchEventSource(url, {
      method,
      headers: stableHeaders,
      body: stableBody,
      signal: controller.signal,
      openWhenHidden,

      async onopen(res) {
        setInternalReadyState(1);
        handleOpen(res);
      },

      onmessage(msg) {
        handleMessage(msg);
      },

      onerror(err) {
        setInternalReadyState(0);
        handleError(err);
        throw err;
      },
    });

    return () => {
      controller.abort();
      controllerRef.current = null;
    };
  }, [enabled, url, method, stableHeaders, stableBody, openWhenHidden]);

  const readyState: ReadyState = enabled ? internalReadyState : 2;

  return {
    readyState,
    close: () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
      setInternalReadyState(2);
    },
    reconnect: () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
      setInternalReadyState(0);
    },
  };
}
