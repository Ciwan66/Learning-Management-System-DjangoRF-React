import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs'
import AuthContext from '../context/AuthContext';
import React ,{useContext} from 'react';
const baseURL = 'http://127.0.0.1:8000/api';

const useAxios = () => {
  const { setUser, authTokens, setAuthTokens } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,  // Ensure cookies are included

  });

  axiosInstance.interceptors.request.use(async req => {
    if (authTokens) {
      const decodedToken = jwtDecode(authTokens.access);
      const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

      if (isExpired) {
        try {
          const response = await axios.post(`${baseURL}/user/token/refresh/`, {
            refresh: authTokens.refresh,
          });
          localStorage.setItem('authTokens', JSON.stringify(response.data));
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));
          req.headers.Authorization = `Bearer ${response.data.access}`;
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Optionally, handle token refresh failure (e.g., log out the user)
        }
      } else {
        req.headers.Authorization = `Bearer ${authTokens.access}`;
      }
    }
    return req;
  });

  return axiosInstance;
};

export default useAxios;