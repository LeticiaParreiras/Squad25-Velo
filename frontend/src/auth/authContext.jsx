import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Importante para não redirecionar antes da hora

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/users/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);