
import React, { useContext } from 'react';
import { useState } from 'react';
import Navbar from '../layout/Navbar';
import LoginFrom from '../layout/account/LoginFrom';
import Sidebar from '../layout/Sidebar';
import Account from '../layout/account/Account';
import { UseContext } from 'react';
import { UserContext } from '../layout/UserContext';
import { useAuth } from '../layout/account/AuthContext';

export default function MyAccount(props) {
  const{user,token}=useAuth();
  const{sidebar}=useContext(UserContext)||{};
          
  return (
                 <div> 
                      <Navbar/>
                      <div className="position-relative">
                        {user?<Account/>: <LoginFrom/>}
                     
                      < div className="position-absolute top-0"> {sidebar? <Sidebar/>:""}</div> 
                      </div>
                 </div> 
  );
};

