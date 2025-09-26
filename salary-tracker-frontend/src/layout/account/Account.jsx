
import React from 'react';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope, faUserClock } from '@fortawesome/free-solid-svg-icons';


export default function Account() {
    const{user,token}=useAuth();
  return (
    <div className="conatainer pt-3 d-flex justify-content-center align-items-center">
         <div className="conatainer text-center border rounded-3" style={{backgroundColor:'#f1c40f'}}>
    <h2 className='pt-3 fs-2 text-center'>hello in your account</h2>
    {!user?"":
    <ul>
        <li className='mt-3 row'> 
              <icon className='fs-2'><FontAwesomeIcon icon={faUser}/> </icon>          
              <h2 clssName="col-6"> name: {user.name}</h2>
        </li>
        <li className='mt-3 row'>
                <icon className='fs-2' ><FontAwesomeIcon icon={faEnvelope} /></icon>
                <h2>email: {user.email}</h2>
        </li>
        <li className='mt-3 row'>
             <icon className='fs-2'><FontAwesomeIcon icon={faUserClock}/></icon>
            <h2>age: {user.age}</h2>
        </li>
    </ul>
    }
 </div>
    </div>

  )
}
