
import React from 'react'
import Navbar from '../layout/Navbar';
import RegesterForm from '../layout/account/RegesterForm';
import { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import { useContext } from 'react';
import { UserContext } from '../layout/UserContext';

export default function Regester() {
      const{sidebar}=useContext(UserContext)||{};
  return (
         <div>
                <div className='home'>
                  <Navbar/>
                  <div className="position-relative">
                   <div className='position-absolute top-0'> {sidebar? <Sidebar/>:""}</div>
                  </div>
                </div>
          <RegesterForm/>
         </div>
  );
};

