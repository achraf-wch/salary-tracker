
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import Introduction from '../layout/Introduction';
import Dashboard from '../layout/Dashboard';
import { useContext,useState } from 'react';
import { UserContext} from '../layout/UserContext';
import { useAuth } from '../layout/account/AuthContext';
import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
const{sidebar}=useContext(UserContext)||{};
const{user,token}=useAuth()||{}
              
  return (
      <div className='home'>
        <Navbar/>
        <div className="position-relative">
         <div className='position-absolute top-0'> {sidebar? <Sidebar/>:""}</div>
         {user?<Dashboard/>:<Introduction/>}
         
        </div>
      </div>
  );
};
