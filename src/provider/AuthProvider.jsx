// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import app from "../../public/Firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [current_user, SetUser] = useState(null);
  const auth = getAuth(app);
  /*const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);*/

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      SetUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ current_user }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
