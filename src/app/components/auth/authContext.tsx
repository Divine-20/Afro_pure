"use client"
import React, { createContext, useContext, useState, useEffect,ReactNode } from 'react';
import { toast } from 'react-toastify';
import { axios } from '../api-services/axios';
import authHeader from '../api-services/auth-header';

interface AuthContextType {
  login: string | null;
  password: string | null;
  loginWithEmailAndPassword: (login: string, password: string) => void;
  logout: () => void;
}
type LoginProps = {
    children: ReactNode;
  };
  
export const AuthContext = createContext<AuthContextType | undefined>({login:null,password:null,loginWithEmailAndPassword:()=>{},logout:()=>{}});

export const AuthProvider = ({ children }:any) => {
  const [login, setLogin] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

  const loginWithEmailAndPassword = async (userLogin: string, userPassword: string) => {

    try {
      const response = await axios.post('/auth/signin', {
        login: userLogin,
        password: userPassword
      },
        {
            headers:authHeader()
        });
    

      const userData = response.data;

      setLogin(userData.login);
      setPassword(userData.password);

      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };
  const logout = () => {
    setLogin(null);
    setPassword(null);
  };
  useEffect(() => {
    if (!login || !password) {
      logout();
    }
  }, [login, password]);


  return (
    <AuthContext.Provider value={{ login, password, loginWithEmailAndPassword,logout}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log(context);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    
    }
    return context;
  };

