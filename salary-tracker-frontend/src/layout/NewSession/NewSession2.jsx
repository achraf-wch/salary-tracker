import React from 'react'
import { useState } from 'react';
import { useAuth } from '../account/AuthContext';
import axios from 'axios';
import { useContext } from 'react';
  import { NewSessionContext } from '../NewSessionContext';

export default function SecondSession(props) {
   const[amount,setAmount]=useState("");
  const[errors,setErrors]=useState({
    food:"",
    housing:"",
    transporation:"",
    education:"",
    health:"",
  });
  const[items,setItems]=useState({
    food:0,
    housing:0,
    transporation:0,
    education:0,
    health:0,
  });
  const{user,token}=useAuth();
  const[error,setError]=useState('');
  const{newSession2,setNewSession2}=useContext(NewSessionContext);

 async function handleSubmit(e){
    e.preventDefault();
      setAmount(props.salary);
      setItems({...items});
      if(items.food<0||items.food>amount)
      errors.food="make sure that food amount is valid";
    else {
      errors.food="";
      setAmount(prevAmount=>prevAmount-items.food)
 
    }
      
   if(items.health<0||items.health>amount)
      errors.health="make sure that health amount is valid";
    else 
    {
          errors.health="";
          setAmount(prevAmount=>prevAmount-items.health);
    }
      
        if(items.housing<0||items.housing>amount)
      errors.housing="make sure that housing amount is valid";
    else 
    {
    errors.housing="";
      setAmount(prevAmount=>prevAmount-items.housing);

    }
    setNewSession2(true);
       if(user){
         
      
            try {
              console.log(user);
              console.log(items);
              const id_category=1;
    const response = await axios.post("http://127.0.0.1:8000/api/cat_goal", {
      id_client:user.id_client,
      id_category:id_category,
      custom:items.custom,
      save:items.save,
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
    <div className="mt-3 container">
      <div className="row">
                           <h3 className="mt-3 m-3 col-5">categories</h3>
                            <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{props.salary===''?"salary":props.salary}</button>
                       <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{amount===''?"amount":amount}</button>
      </div>
       
  <form onSubmit={handleSubmit}>
             
             <div>
                  <input className={errors.food===""?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" vallue={items.food} placeholder='food' 
                  onChange={(e)=>{
                  const val = Number(e.target.value)
                  items.food=val
               }}/>
             </div>
             <div>
                  <input className={errors.health===""?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" vallue={items.health} placeholder='health' 
                  onChange={(e)=>{
                  const val = Number(e.target.value)
                  items.health=val
                  }}/>
             </div>
              <div>
                <input className={errors.health===""?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" vallue={items.housing} placeholder='housing' 
                onChange={(e)=>{
                  const val = Number(e.target.value)
                  items.housing=val
                }}/>
              </div>
               
              <button className="mt-4 btn btn-lg col-12 rounded-pill" style={{backgroundColor:'#2c3e50'}}  type="submit">done</button>
   
   
  </form>
   </div>
  )
}
