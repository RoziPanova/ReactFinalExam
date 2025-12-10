import { createContext,  useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);        // user object
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { navigate } = useNavigate();

  useEffect(() => {
    // On page load, check sessionStorage for logged-in user
    const token = sessionStorage.getItem("authToken");
    const userId = sessionStorage.getItem("userId");
    const username = sessionStorage.getItem("username");

    if (token && userId) {
      setUser({ _id: userId, username });
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = ({ _id, username, accessToken }) => {
    sessionStorage.setItem("authToken", accessToken);
    sessionStorage.setItem("userId", _id);
    sessionStorage.setItem("username", username);

    setUser({ _id, username });
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook for easy usage
export function useUserContext() {
  return useContext(UserContext);
}
