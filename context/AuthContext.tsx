"use client";

import { setSession } from "@/utils/bearerAxios";
import { createContext, ReactNode, useLayoutEffect, useState } from "react";

// export type LoginType = {
//   email: string;
//   password: string;
//   remember_me?: boolean;
// };

export interface AuthContextType {
  user: string | null;
  // login: (data: LoginType) => void;
  // logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  // login: () => {},
  // logout: () => {},
});

export const AuthProvider = ({
  children,
  auth,
}: {
  children: ReactNode;
  auth: string | null;
}) => {
  const [user, setUser] = useState("");

  useLayoutEffect(() => {
    if (auth?.length) {
      setSession(auth);
      setUser(auth);
    }
  }, [auth]);

  // const login = (data: LoginType) => {
  //   // Simulate logged-in user
  //   const loggedInUser = {
  //     email: data.email,
  //     remember_me: data.remember_me ?? false,
  //   };

  //   setUser(loggedInUser);
  // };

  // const logout = () => {
  //   setUser(null);
  // };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
