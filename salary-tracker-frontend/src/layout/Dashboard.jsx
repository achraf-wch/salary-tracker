
import React from 'react';
import { useAuth } from './account/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const{user,token}=useAuth();
  return (
    <div className="container row pt-3">
        <h2 className='col-6'>this is your dashboard</h2>
        <div className="col-6  d-flex justify-content-end"><h2 className='col-6 d-flex justify-content-center align-items-center  border rounded-pill' style={{backgroundColor:'#f1c40f'}}>{user?user.name:""}</h2></div>
        <div className="container d-flex justify-content-center align-items-center p-4">
           <div className='text-center text-center p-3 border rounded-3 'style={{backgroundColor:'#f1c40f'}}>
            <p className='fs-2'>you can start a new seesion on click here</p>
            <Link  className="btn btn-outline-primary" to={'/NewSession'}>here</Link>
            <p className="fs-2 pt-3">for more there is the icon on the left</p>
        </div>
        </div> 
    </div>
  )
}

