import { useApi } from "@/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ArenaEventsResponse, RequestLog } from "./useArenaEvents.types";

export function useArenaEvents(month: number) {
  const params = useMemo(() => ({ month: month.toString() }), [month]);
  const [requestLog, setRequestLog] = useState<RequestLog[]>([]);
  const requestStartTime = useRef<number | null>(null);

  const { data, loading, error, execute } = useApi<ArenaEventsResponse>(
    "/api/arena/events",
    {
      method: "GET",
      immediate: false,
      params,
    }
  );

  useEffect(() => {
    requestStartTime.current = Date.now();
    console.log(`🔄 Requesting month ${month} at`, new Date().toISOString());

    execute().then(() => {
      if (requestStartTime.current) {
        const duration = Date.now() - requestStartTime.current;
        const fromCache = duration < 100;

        console.log(
          `✅ Response received in ${duration}ms ${
            fromCache ? "(likely cached)" : "(fresh fetch)"
          }`
        );

        setRequestLog((prev) => [
          ...prev,
          {
            month,
            timestamp: new Date().toISOString(),
            fromCache,
            duration,
          },
        ]);
      }
    });
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  return {
    events: data?.data || [],
    total: data?.total || 0,
    loading,
    error,
    refetch: execute,
    requestLog,
  };
}
