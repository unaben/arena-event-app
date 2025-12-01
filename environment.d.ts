/* eslint-disable @typescript-eslint/no-unused-vars */
import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ARENA_BEARER_TOKEN: string;
      ARENA_AUTH_URL: string;
      ARENA_AUTH_BASE_URL: string;
    }
  }
}
