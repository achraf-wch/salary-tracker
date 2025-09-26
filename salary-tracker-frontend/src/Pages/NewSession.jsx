
import React from 'react'
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import NewSession from '../layout/NewSession/NewSession';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../layout/UserContext';


export default function NewSession1 () {
   const{sidebar}=useContext(UserContext)||{};
  return (
    
   <div>
      <Navbar />
        <div className="position-relative">
        <NewSession/>
        < div className="position-absolute top-0"> {sidebar? <Sidebar/>:""}</div> 
        </div>
  </div>
  );
};