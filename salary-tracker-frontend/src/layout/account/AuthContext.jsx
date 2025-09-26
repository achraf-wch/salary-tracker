import { useContext,createContext,useState } from "react";
export const AuthContext = createContext();
export function AuthProvider({children}){
    const[user,setUser]=useState(null);
    const[token,setToken]=useState(null);
    const setAuth=(userData,tokenData)=>{
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('authToken',tokenData)
    }
    const logOut = ()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken')
    }
    return (
        <AuthContext.Provider value={{user,token,setAuth,logOut}}>{children} </AuthContext.Provider>
    )
};
export const useAuth = () => useContext(AuthContext);