
import React from 'react'
import Navbar from '../layout/Navbar';
import LoginFrom from '../layout/account/LoginFrom';
import Sidebar from '../layout/Sidebar';
import { useContext } from 'react';
import { UserContext } from '../layout/UserContext';
export default function Login() {
        const{sidebar}=useContext(UserContext)||{};
  return (
         <div>
              <Navbar/>
              <div className="position-relative">
              <LoginFrom/>
              < div className="position-absolute top-0"> {sidebar? <Sidebar/>:""}</div> 
              </div>
         </div>
  );
};

