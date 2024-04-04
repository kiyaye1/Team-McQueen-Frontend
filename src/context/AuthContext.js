import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import BASE_API_URI from "../config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const reauthenticate = async () => {
      try {
        const response = await axios.get(`${BASE_API_URI}/refresh`, {withCredentials: true});
        console.log(response);
        const userData = {
          isLoggedIn: true,
          isEmployee: response.data.role > 0,
          role: response.data.role,
          userID: response.data.userID,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          emailAddress: response.data.emailAddress,
          xtra: response.data.xtra
        };
        setUser(userData);
      } catch (error) {
          console.error("Re-authentication failed:", error);
      }
    };
    reauthenticate();
  }, []);

  const login = async (emailAddress, password) => {
    try {
      const loginResponse = await axios.post(`${BASE_API_URI}/login/loginRequest`, { emailAddress, password }, { withCredentials: true });
      const userInfoResponse = await axios.get(`${BASE_API_URI}/loginInfo/getInfo`, { withCredentials: true });
  
      if (userInfoResponse.data.role >= 0) {
        const userData = {
          isLoggedIn: true,
          isEmployee: userInfoResponse.data.role > 0,
          role: userInfoResponse.data.role,
          userID: userInfoResponse.data.userID,
          firstName: userInfoResponse.data.firstName,
          lastName: userInfoResponse.data.lastName,
          emailAddress: userInfoResponse.data.emailAddress,
          xtra: userInfoResponse.data.xtra,
        };
        setUser(userData);
        return userData;
      } else {
        throw new Error('Invalid user role.');
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BASE_API_URI}/login/logout`, {}, { withCredentials: true });
      setUser(null);
      sessionStorage.removeItem('employeeRole');
      sessionStorage.removeItem('reservationComplete');
      sessionStorage.removeItem('lastLocation');
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
