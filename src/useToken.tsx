import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString !== null ? JSON.parse(tokenString) : "";
        return userToken?.token
    }
    const [token, setToken] = useState<string>(getToken());
  
    const saveToken = (userToken:any) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    }

    return {
        setToken: saveToken,
        token
    }
}