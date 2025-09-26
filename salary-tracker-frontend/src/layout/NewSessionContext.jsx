import { createContext,useState } from 'react';
import React from 'react';

export const NewSessionContext = createContext({});
export function NewSessionProvider({children}){
   const[newSession1,setNewSession1]=useState(false);
   const[newSession2,setNewSession2]=useState(false);
   const[newSession3,setNewSession3]=useState(false);
   return (
    <NewSessionContext.Provider value={{
        newSession1,setNewSession1,
        newSession2,setNewSession2,
        newSession3,setNewSession3}}
        >{children}</NewSessionContext.Provider>
);
};


