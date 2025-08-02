"use client";

import Footer from "@/components/content/footer";
import Header from "@/components/content/header";
import Navbar from "@/components/content/Navbar";
import { BottomNavBar } from "@/components/custom/navigationBar";
import Sidebar from "@/components/custom/sidebar";
import { useUser } from "@/context/userContext";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);
  const { currentUser, isAuthenticated } = useUser();
  const isAuthPage = pathname === "/auth";
  const isHomePage = pathname === "/";

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {!isAuthPage && (
        <>
          {isAuthenticated && currentUser ? (
            <>
              <Sidebar
                isMobileSidebarOpen={isMobileSidebarOpen}
                setIsMobileSidebarOpen={setIsMobileSidebarOpen}
              />
              <div className="flex-1 flex flex-col md:ml-64">
                <div className="block md:hidden">
                  <Header setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
                </div>
                <main className="mt-12 md:mt-0 flex-1 overflow-y-auto md:p-4 p-2 pb-8">
                  {children}
                </main>
                <BottomNavBar isLoggedIn={true} />
              </div>
            </>
          ) : (
            <>
              <Navbar />
              <main className={isHomePage ? "mt-16" : ""}>{children}</main>
              {isHomePage && <Footer />}
            </>
          )}
        </>
      )}
      {isAuthPage && children}
    </React.Suspense>
  );
}
