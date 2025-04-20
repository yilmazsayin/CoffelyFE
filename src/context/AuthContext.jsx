import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const userEmail = "user@mail.com";
    const adminEmail = "admin@mail.com";
    if ((email === userEmail || email === adminEmail) && password === "1234") {
      const userData = {
        email,
        password,
        role: email === adminEmail ? "admin" : "user",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
