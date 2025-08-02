"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface User {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  googleId?: string;
  email: string;
  email_verified?: boolean;
  profileId?: string;
  profilePicture?: string;
  gender?: "male" | "female" | "other";
}

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}

interface User {
  _id?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  googleId?: string;
  email: string;
  email_verified?: boolean;
  profileId?: string;
  profilePicture?: string;
  gender?: "male" | "female" | "other";
  createdAt?: number;
  updatedAt?: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initAuth = async () => {
      let token = searchParams.get("token");
      console.log({ token, searchParams });

      if (token) {
        localStorage.setItem("authToken", token);
        const url = new URL(window.location.href);
        url.searchParams.delete("token");
        window.history.replaceState({}, document.title, url.pathname);
      } else {
        token = localStorage.getItem("authToken");
      }

      console.log("first", token);

      if (token) {
        try {
          const res = await axios.get(
            "https://fimon-app-backend-100.onrender.com/auth/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setCurrentUser(res.data.user || res.data);
        } catch (err) {
          console.error("Auth error:", err);
          setCurrentUser(null);
          localStorage.removeItem("authToken");
        }
      }
    };

    initAuth();
  }, [searchParams]);

  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    router.push("/auth");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
