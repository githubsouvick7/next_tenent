"use client"; // This component is explicitly client-side

import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "./fetcher";

interface SWRProviderProps {
  children: ReactNode;
}

export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (endpoint: string) => fetcher(endpoint),
        onError: (error: Error) => console.error("SWR Error:", error.message),
        revalidateOnFocus: true,
        refreshInterval: 0,
      }}
    >
      {children}
    </SWRConfig>
  );
}
