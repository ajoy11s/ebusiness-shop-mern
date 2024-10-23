import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../provider/AuthProvider";

export const useLoginUserBackendData = () => {
  const [currentUserDataBackend, setCurrentUserDataBackend] = useState(null);
  const { current_user } = useContext(AuthContext);

  
  useEffect(() => {
    if (current_user && current_user.email) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_GET_SINGLE_LOGIN_USER}${current_user.email}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCurrentUserDataBackend(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [current_user]);

  return { currentUserDataBackend, setCurrentUserDataBackend };
};
