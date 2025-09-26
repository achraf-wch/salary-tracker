
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../account/AuthContext';
import axios from 'axios';
import { useContext } from 'react';
import { NewSessionContext } from '../NewSessionContext';

export default function Session() {
    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");
    const[errors,setErrors] = useState({
      startDate:"",
      endDate:"", 
    })
    const {user,token}=useAuth();
    const[amount,setAmount]=useState("");
    const[error,setError]=useState('');
    const{newSession3,setNewSession3}=useContext(NewSessionContext);
    async function handleForm(e){
        e.preventDefault();
          
          setNewSession3(true);
          console.log(newSession3);
             if(user){
         
      
            try {
              console.log(user);
        
              
    const response = await axios.post("http://127.0.0.1:8000/api/dates", {
      
      
    start:startDate,
    end:endDate,
    });

  } 
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Try again.');
      }
    }
    console.log(Error);
        }
    }


  return (
          
          <div className="container mt-3">
            <h3>date</h3>
            <form onSubmit={handleForm}>
              <div>
                  <input type="date" className={errors.startDate===""?"form-control col-12" :"form-control col-12 bg-danger"} placeholder='start date'
                  value = {startDate} onChange={(e)=>{setStartDate(e.target.value)}}/>
                  {errors.startDate===""?"":<p>{errors.startDate}</p>}
              </div>
              <div>
                    <input type="date" className={errors.endDate===""?"form-control mt-3" :"form-control mt-3 bg-danger" }placeholder='end date'
                    value = {endDate} onChange={(e)=>{
                    setEndDate(e.target.value)
                    }}/>
                    {errors.endDate===""?"":<p>{errors.endDate}</p>}
              </div>
                 
                  
                 <button type="submit" className="mt-3 btn btn-lg col-12 rounded-pill" style={{backgroundColor:'#2c3e50'}}>done</button>
            </form>
          </div>
         
  )
}

