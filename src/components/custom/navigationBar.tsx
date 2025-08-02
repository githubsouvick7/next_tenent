"use client";

import { cn } from "@/lib/utils";
import { Bell, Calendar, Home, Receipt, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
};

export function BottomNavBar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();

  // Only show for logged in users on mobile
  if (!isLoggedIn) return null;

  const navItems: NavItem[] = [
    {
      href: "/dashboard",
      icon: <Home className="h-6 w-6" />,
      label: "Dashboard",
    },
    {
      href: "/calender",
      icon: <Calendar className="h-6 w-6" />,
      label: "Calender",
    },
    {
      href: "/expenses",
      icon: <Receipt className="h-6 w-6" />,
      label: "Expense",
      highlight: true,
    },
    {
      href: "/notifications",
      icon: <Bell className="h-6 w-6" />,
      label: "Notifications",
    },
    {
      href: "/profile",
      icon: <User className="h-6 w-6" />,
      label: "Profile",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-[#1A1B25] border-t border-gray-700 shadow-lg">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center px-1 transition-all duration-200",
              pathname === item.href ? "text-white" : "text-gray-400",
              item.highlight ? "-mt-6" : ""
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center",
                item.highlight ? "bg-[#6C5CE7] rounded-full p-4 shadow-lg" : ""
              )}
            >
              {item.icon}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
