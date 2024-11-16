import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const baseURL = 'http://127.0.0.1:8000/api'

const useAxios = ()=>{
    const {setUser , authTokens, setAuthTokens,user} = useContext(AuthContext)

    const axiosInstance  = axios.create({
        baseURL: baseURL,
        timeout: 1000,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
      });

    axiosInstance.interceptors.request.use(async req =>{
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return req;

        const response = await axios.post(`${baseURL}/user/token/refresh/`,{
            refresh : authTokens.refresh
        });
        localStorage.setItem('authTokens', JSON.stringify(response.data))
        // localStorage.setItem('authTokens', JSON.stringify(response.data))
        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))
        req.headers.Authorization = `Bearer ${response.data.access}`;

        return req

    })
    const apiInstance = axios.create({
        // Set the base URL for this instance. All requests made using this instance will have this URL as their starting point.
        baseURL: 'http://127.0.0.1:8000/api',
    
        // Set a timeout for requests made using this instance. If a request takes longer than 5 seconds to complete, it will be canceled.
        timeout: 5000, // timeout after 5 seconds
    
        // Define headers that will be included in every request made using this instance. This is common for specifying the content type and accepted response type.
        headers: {
            'Content-Type': 'application/json', // The request will be sending data in JSON format.
            Accept: 'application/json', // The request expects a response in JSON format.
        },
    });
    
    return user ? axios : apiInstance 
}

export default useAxios