
import React from 'react';
import MyAccount from '../Pages/MyAccount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCoffee, faHome, faRightToBracket, faSignInAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { Link } from 'react-router-dom';
import { useContext,useState } from 'react';
import { UserContext } from './UserContext';
import { useAuth } from './account/AuthContext';

export default function Navbar(props) {
  const {setSidebar}=useContext(UserContext)||{};
  const {sidebar}=useContext(UserContext)||{};
  const{user,token}=useAuth()||{};
  return (
      <div className="" style={{backgroundColor:'#2c3e50',height:'20vh'}}>
        <ul className="row list-unstyled align-items-center">
            <li className="col-1 pt-3 text-end fs-2" onClick={()=>{setSidebar(!sidebar)}}><FontAwesomeIcon icon={faBars}/></li>
            <li className="col-1 pt-3 text-start fs-2"><a href=""><FontAwesomeIcon icon={faHome}/></a></li>
            <li className="col-5 pt-3 text-center"><h2>your tracker application</h2></li>
            <li className="col-4 text-center fs-2">
              {user?<div>
                <Link to='/MyAccount'>
                      <FontAwesomeIcon icon={faUser}/>
                      <h2>{user.name}</h2>
                </Link>
              </div>:
              <div>
               <Link to="/Login">< FontAwesomeIcon icon={faUser}/></Link>
                 <h2>Login</h2>
                </div>}
              
              
            </li>
        </ul>
      </div>
  )
}
