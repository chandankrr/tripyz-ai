import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (error) => console.log('Login Failed:', error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'Application/json',
          },
        }
      )
      .then((res) => {
        setUser(res.data);
      });
  };

  const logout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
