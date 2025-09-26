import { createContext,useState } from 'react';
import React from 'react';

export const UserContext = createContext({});export function UserProvider({children}){
   const[sidebar,setSidebar]=useState(false);
   return (
    <UserContext.Provider value={{sidebar,setSidebar}}>{children}</UserContext.Provider>
);
};


