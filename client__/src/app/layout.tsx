import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Flip, ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/userContext";
import { Suspense } from "react";
import Loading from "@/components/custom/Loading";
import { ThemeProvider } from "@/components/theme-provider";
import SWRProvider from "@/lib/swrprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fimon.app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <SWRProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <UserProvider>
                {children}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  transition={Flip}
                />
              </UserProvider>
            </ThemeProvider>
          </SWRProvider>
        </Suspense>
      </body>
    </html>
  );
}
