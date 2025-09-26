
import React from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function RegesterForm() {
  const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[age,setAge]=useState();
    const[password,setPassword]=useState("");
     const[errors,setErrors]=useState({
      nameError:"",
      ageError:"",
      emailError:"",
      passwordError:"",
     })

   async function  handleSubmit(e){
      e.preventDefault();
      console.log('hi there');
      if(name.length<3)
          errors.nameError="make sure the name is right";
      else errors.nameError="";
      if(!email.includes('@gmail.com'))
          errors.emailError="make sure the email is right";
      else  errors.emailError="";
      if(password.length<4)
         errors.passwordError="make sure the password is right";
      else errors.passwordError="";
       setErrors({...errors})
    
    try {
    const response = await axios.post("http://127.0.0.1:8000/api/register", {
      name: name,
      email: email,
      age: Number(age),
      password: password,
    });

    console.log("Client created:", response.data);

  } catch (error) {
    console.error("Error:", error);
  }
}    
  return (
      <div className="container">
           <form onSubmit={handleSubmit}>
          <div className="">
                  <p className='col-3'>name</p>
                 <input className ={errors.nameError===""?"col-4 form-control":"col-4 form-control bg-danger"} type="text" placeholder='name'
                  value={name} onChange={(e)=>{setName(e.target.value)}} />
                  {errors.nameError===""?"":<p className="text-danger">make sure the name is valid</p>}
          </div>
          <div className="mt-4">
                  <p className='col-3'>age</p>
                 <input className ={errors.ageError===""? "col-4 form-control":"col-4 form-control bg-danger"} type="text" placeholder='age'
                 value={age} onChange={(e)=>{setAge(e.target.value)}} />
                 {errors.ageError===""?"":<p className="text-danger">we only accept bigger than 15</p>}
          </div>
                    <div className="mt-4">
                  <p className='col-3'>email</p>
                 <input className ={errors.emailError===""? "col-4 form-control":"col-4 form-control bg-danger"} type="text" placeholder='email'
                 value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                 {errors.emailError===""?"":<p className="text-danger">make sure the email is valid</p>}
          </div>
                    <div className="mt-4">
                  <p className='col-3'>password</p>
                 <input className = {errors.passwordError===""? "col-4 form-control":"col-4 form-control bg-danger"} type="text" placeholder='password' 
                 value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                 {errors.passwordError===""?"":<p className="text-danger">make sure the password is strong</p>}
          </div>
          <button type="submit" className="mt-4 btn col-12 btn-outline-info">Regester</button>
           
        </form>
      
        
    </div>
  )
}

