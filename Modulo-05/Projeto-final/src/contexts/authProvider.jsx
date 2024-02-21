import React, { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loginToken, setLoginToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(token !== null);
    setUserRole(role !== null ? role : "");
    setLoginToken(token !== null ? token : "");
  }, []);

  const login = (email, role) => {
    localStorage.setItem("loginToken", email);
    localStorage.setItem("userRole", role);
    setIsLoggedIn(true);
    setUserRole(role);
    setLoginToken(email);
  };

  const logout = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole("");
    setLoginToken("");
  };

  const isAdmin = () => {
    return userRole === "admin";
  };

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, login, logout, isAdmin, loginToken }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
