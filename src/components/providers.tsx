"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1c2333",
            color: "#e2e8f0",
            border: "1px solid #1e293b",
            borderRadius: "12px",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#1c2333" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#1c2333" },
          },
        }}
      />
    </SessionProvider>
  );
}
