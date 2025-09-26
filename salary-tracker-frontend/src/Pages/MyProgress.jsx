
import React, { useContext } from 'react'
import Progress from '../layout/Progress';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import { UserContext } from '../layout/UserContext';
export default function MyProgress() {
  const{sidebar}=useContext(UserContext);
  return (
       <div>
         <Navbar />
           <div className="position-relative">
           <Progress/>
           < div className="position-absolute top-0"> {sidebar? <Sidebar/>:""}</div> 
           </div>
   </div>
  );
};

