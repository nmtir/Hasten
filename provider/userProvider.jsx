"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext({
  user: null,
  updateUser: () => {
  },
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const decodeAndSetUser = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.log('Invalid token', error);
      }
    }
  };

  useEffect(() => {
    // Initialize user on component mount
    decodeAndSetUser();

    // Listen for custom "tokenChange" event
    const handleTokenChange = () => {
      decodeAndSetUser();
    };
    window.addEventListener("tokenChange", handleTokenChange);

    return () => {
      window.removeEventListener("tokenChange", handleTokenChange);
    };
  }, []);

  const triggerTokenChange = () => {
    const event = new Event("tokenChange");
    window.dispatchEvent(event);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser: triggerTokenChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
