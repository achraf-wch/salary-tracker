

import  './Layoutcss.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from './account/AuthContext';
export default function Sidebar() {
  const{user,token}=useAuth();
  return (
    <div className="sidebar" >
        <ul className="row  border border-end rounded-4 p-2 text-center" style={{width:'250px',height:'60vh',backgroundColor:'#f1c40f'}}> 
            <li className=""><h3><Link className="text-decoration-none " to="/">Home</Link></h3></li>
            <li  className=""><h3><Link className="text-decoration-none" to="/MyAccount">MyAccount</Link></h3></li>
            <li  className=""><h3>{user?<Link className="text-decoration-none" to="/MyProgress">MyProgress</Link>:<h2>login for MyProgress</h2>}</h3></li>
            <li  className=""><h3>{user?<Link className="text-decoration-none" to="/NewSession">NewSession</Link>:<h2>login for NewSession</h2>}</h3></li>           
        </ul>
    </div>
  );
};

