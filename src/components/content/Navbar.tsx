"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "shadow backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6 animate-fade-in-down">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group transition hover:scale-105"
          >
            <Image
              src="https://pub-07d8598045444efc9676b80f08ab88fe.r2.dev/fimon.app%20(1).png"
              width={40}
              height={40}
              alt="logo"
              className="transition duration-300 group-hover:rotate-6"
            />
            <h1 className="text-2xl font-semibold transition group-hover:text-primary">
              Fimon.app
            </h1>
          </Link>

          {/* Actions */}
          <div className="flex gap-2 items-center">
            <Link href="/auth">
              <Button className="transition-all hover:scale-105">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
