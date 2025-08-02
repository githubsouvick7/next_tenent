// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// const Footer = () => {
//   return (
//     <footer className="border-t">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex justify-between items-center ">
//           {/* Company Info */}
//           <div>
//             <Link href="/" className="flex items-center space-x-3">
//               <Image
//                 src={
//                   "https://pub-07d8598045444efc9676b80f08ab88fe.r2.dev/fimon.app%20(1).png"
//                 }
//                 width={40}
//                 height={40}
//                 alt="logo"
//               />
//               <h1 className="font-semibold text-2xl">Fimon.app</h1>
//             </Link>
//             <p className="text-sm">
//               Your trusted companion for managing personal finances and
//               achieving financial goals.
//             </p>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <div className="space-y-2 text-sm">
//               <p>Email: support@personalfinance.com</p>
//               <p>Phone: (555) 123-4567</p>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t mt-8 pt-8 text-sm text-center">
//           <p>© {new Date().getFullYear()} Fimon.app All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="z-10 px-5 max-w-7xl mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="space-y-4">
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
            <p className="text-muted-foreground">
              Creating beautiful digital experiences that inspire and connect
              people around the world.
            </p>
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-9 w-9"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-9 w-9"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-9 w-9"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-9 w-9"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground">
              Get the latest updates and news right at your inbox.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-full"
              />
              <Button className="rounded-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Brand. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
