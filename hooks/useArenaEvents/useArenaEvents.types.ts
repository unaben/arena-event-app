import type { IArenaEventResponse } from "@/types/arena.types";

export interface ArenaEventsResponse {
    data: IArenaEventResponse[];
    total: number;
    month: number;
  }
  
  export interface RequestLog {
    month: number;
    timestamp: string;
    fromCache: boolean;
    duration: number;
  }