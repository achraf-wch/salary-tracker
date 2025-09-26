
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
export  default function LoginFrom() {
  const[email,SetEmail]=useState('');
   const[password,SetPassword]=useState('');
   const[client,setClient]=useState(null);
   const[error,setError]=useState('');
   const navigate=useNavigate();
   const {setAuth}=useAuth();
  async function handlesubmit(e){
    e.preventDefault();
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      
      email: email,
      password:password,
     
    },{ withCredentials: true });
     const clientData = response.data.client;
     const tokenData = response.data.token;
     navigate('/Home');
     setAuth(clientData,tokenData);
    console.log("loged in:", response.data);

  } 
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Try again.');
      }
    }
  }
  return (
      <div className="pt-3 container">
        <div>{client?<h2>hi {client.name}</h2>:<h2>nothing</h2>}</div>
            <div>{client?<h2>hi {client.name}</h2>:<h2>nothing</h2>}</div>
            <div>{error}</div>
        <div className="row">
            <p className="col-12 text-center">do you have an acount ?</p>
            <form action="" onSubmit={handlesubmit}>
                <input className="form-control text-center" name="email" type="text" value={email} placeholder="email" 
                onChange={(e)=>{SetEmail(e.target.value)}}/>
                <input className="mt-3 form-control text-center" name="password" type="password" value={password} placeholder="password" 
                onChange={(e)=>{SetPassword(e.target.value)}}/>
                <button type="submit" className="mt-3 col-12 text-center btn btn-outline-info">login</button>
            </form>
            <div className="col-12">
            </div>
                     <p className=" mt-5 col-12 text-center">you don't have an account?</p>
                     <p className="mt-2 col-12 text-center btn btn-outline-info"><Link to="/Regester">sign in</Link></p>
        </div>
      </div>
  )

}



  
  