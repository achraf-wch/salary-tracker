import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import { UserProvider } from './layout/UserContext';
import Navbar from './layout/Navbar';
import Router from './Router/Router';
import Sidebar from "./layout/Sidebar";
import Dashboard from "./layout/Dashboard";
import Progress from "./layout/Progress";
import Account from "./layout/account/Account";
import { useAuth } from "./layout/account/AuthContext";
import { NewSessionProvider } from "./layout/NewSessionContext";
import { AuthProvider } from "./layout/account/AuthContext";

function App() {
  const{user,token}=useAuth()||{}
  return (
    <BrowserRouter>
    <AuthProvider>
      <NewSessionProvider>
        <div>
          {user?<Dashboard/>:""}
              {user?<Progress/>:""}
       
      <UserProvider>
        
        
        <Router/>
        
         {user?<Account/>:""}
     
         
         
      </UserProvider>
    </div>
      </NewSessionProvider>
      </AuthProvider>
      </BrowserRouter>
    
  );
}

export default App;
