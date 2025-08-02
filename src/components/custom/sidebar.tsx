"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/userContext";
import { cn } from "@/lib/utils";
import {
  Bell,
  Calendar,
  EllipsisVertical,
  Home,
  LogOut,
  Moon,
  Receipt,
  Sun,
  User,
  UserCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) => {
  const { currentUser } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  const theme = localStorage.getItem("theme");

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Expenses", href: "/expenses", icon: Receipt },
    { name: "Calender", href: "/calender", icon: Calendar },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Profile", href: "/profile", icon: UserCircle },
  ];

  const initials = currentUser?.fullName
    ? currentUser.fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  console.log(isMobileSidebarOpen);

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "border-r border-gray-200 flex flex-col h-screen overflow-y-auto fixed left-0 top-0 bottom-0 z-50 transition-all duration-300 w-64",
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 border-b px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={
                "https://pub-07d8598045444efc9676b80f08ab88fe.r2.dev/fimon.app%20(1).png"
              }
              width={40}
              height={40}
              alt="logo"
            />
            <h1 className="font-semibold text-lg">Fimon.app</h1>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md",
                  isActive && "bg-gray-100 text-black"
                )}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-b flex items-center justify-between mb-6 gap-2">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={currentUser?.profilePicture} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{currentUser?.fullName}</p>
              <p className="text-xs text-gray-500">{currentUser?.email}</p>
            </div>
          </div>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer">
                  <EllipsisVertical className="text-sm" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <div
                    onClick={() => {
                      if (theme === "dark") {
                        setTheme("light");
                      } else {
                        setTheme("dark");
                      }
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    Appearance
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <User size={16} />
                    Profile
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("user");
                      router.push("/auth");
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="text-red-500" size={16} />
                    LogOut
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
