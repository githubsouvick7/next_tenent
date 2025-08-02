"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/userContext";
import { LogOut, Menu, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DropdownMenu } from "../ui/dropdown-menu";

interface compProps {
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<compProps> = ({ setIsMobileSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currentUser, isAuthenticated } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme } = useTheme();
  const theme = localStorage.getItem("theme");

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleLogin = (): void => {
    router.push("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="shadow-sm border-b border-gray-200 backdrop-blur-sm md:px-4 px-2 py-2 md:z-50 z-30 fixed top-0 left-0 right-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-xl"
            onClick={() => {
              setIsMobileSidebarOpen(true);
              console.log("object");
            }}
          >
            <Menu />
          </Button>
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={
                "https://pub-07d8598045444efc9676b80f08ab88fe.r2.dev/fimon.app%20(1).png"
              }
              width={40}
              height={40}
              alt="logo"
            />
            <h1 className="font-semibold text-2xl">Fimon.app</h1>
          </Link>
        </div>

        <div className="relative" ref={dropdownRef}>
          {isAuthenticated ? (
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center focus:outline-none"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <Avatar className="h-8 w-8 transition-opacity hover:opacity-80">
                      <AvatarImage
                        src={currentUser?.profilePicture}
                        alt="User"
                      />
                      <AvatarFallback className="text-gray-200 bg-primary font-bold">
                        {currentUser?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
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
                      {theme === "dark" ? (
                        <Sun size={16} />
                      ) : (
                        <Moon size={16} />
                      )}
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
                      <LogOut size={16} />
                      LogOut
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleLogin} variant="outline">
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
