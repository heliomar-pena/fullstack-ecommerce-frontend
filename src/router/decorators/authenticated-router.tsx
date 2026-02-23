import { API_BASE_URL } from "@/config/api";
import type { SseEnvelope } from "@/hooks/sse/handlers/sse-handlers";
import { useSSE } from "@/hooks/sse/use-sse";
import { useSseEventRouter } from "@/hooks/sse/use-sse-event-router";
import { AuthenticatedUserLayout } from "@/layouts/authenticated-user.layout";
import { getToken } from "@/stores/authStore";
import { useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

export const AuthenticatedRouter = () => {
  const token = getToken();
  const navigate = useNavigate();
  const routeEvent = useSseEventRouter();

  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : undefined),
    [token],
  );

  useSSE({
    url: `${API_BASE_URL}/events/sse`,
    enabled: !!token,
    headers,
    openWhenHidden: false,
    onMessage: (msg) => {
      const raw = msg.data?.trim();

      if (!raw) return;

      try {
        const evt = JSON.parse(raw) as SseEnvelope;
        routeEvent(evt);
      } catch {
        console.error("[SSE] invalid JSON:", raw);
      }
    },
    onError: (e) => console.error("SSE error", e),
  });

  useEffect(() => {
    if (!token) {
      toast.info("You're being redirected to login...");
      navigate("/auth/login");
    }
  }, [token, navigate]);

  return (
    <AuthenticatedUserLayout>
      <Outlet />
    </AuthenticatedUserLayout>
  );
};
