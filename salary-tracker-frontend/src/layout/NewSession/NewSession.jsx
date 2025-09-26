
import React from 'react'
import { useState } from 'react'
import NewSession2 from './NewSession2';
import NewSession3 from './NewSession3';
import axios from 'axios';
import { useAuth } from '../account/AuthContext';
export default function Session() {
    const[salary,setSalary]=useState('');
    const{user,token}=useAuth()||{};     
    const[error,setError]=useState('');
    const[amount,setAmount]=useState("");
    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");
    const[idGoal, setIdGoal]=useState(0);
     const[idDate, setIdDate]=useState(0);
     const[idCatGoal, setIdCatGoal]=useState(0);
     const[goal,setGoal]=useState({
     save:{amount:null,error:null},
     invest:{amount:null,error:null},
     custom:{amount:null,error:null},
     idGoal:{id:null},
     });
    const[errors,setErrors] = useState({
            startDate:"",
            endDate:"",  
    });
    const[items,setItems]=useState({
            food:{id:1,amount:0,error:null},
            health:{id:2,amount:0,error:null},
            learning:{id:3,amount:0,error:null},
            travel:{id:4,amount:0,error:null},
            sport:{id:5,amount:0,error:null},
      });
    async function handleForm(e){
        e.preventDefault();
        validate();
        //send api to goal
        if(user){
            try {
    const response = await axios.post("http://127.0.0.1:8000/api/goal", {
      id_client:user.id_client,
      custom:goal['custom'].amount,
      save:goal['save'].amount,
      invest:goal['invest'].amount,
    });
    console.log('goal table');
    console.log(response.data);
    setIdGoal(response.data.id_goal);
  } 
  
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Try again.');
      }
      console.log(err);

    }
    
    ///////////////send api to cat goal
    ////////////first send the api for food
   
    if(items['food'].amount>0){
 
         try {
          console.log(user.id_client,items['food'].amount);
 
    const response = await axios.post("http://127.0.0.1:8000/api/cat_goal", {
      id_client:user.id_client,
      id_category:items['food'].id,
      cat_custom:items['food'].amount,
      
    });
    console.log('food category');
    console.log(response.data);
    console.log(items['food'].id);

  } 
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Try again.');
      }
      console.log(err);
      console.log(items['food'].id);
      console.log('err');
    }
    }
    if(items['health'].amount>0){

         try {
         
 
    const response = await axios.post("http://127.0.0.1:8000/api/cat_goal", {
      id_client:user.id_client,
      id_category:items['health'].id,
      cat_custom:items['health'].amount,
      
    });
     console.log("htis is health");
    console.log(response.data);
    console.log(items['health'].id);
    setIdCatGoal(response.data.id_cat_goal);
  } 
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Try again.');
      }
      console.log(err);
      console.log(items['health'].id);
       console.log(items['health'].amount);

   
    }
    }
    
      if(items['learning'].amount>0){
 
         try {
          console.log(user.id_client,items['food'].amount);
 
    const response = await axios.post("http://127.0.0.1:8000/api/cat_goal", {
      id_client:user.id_client,
      id_category:items['learning'].id,
      cat_custom:items['learning'].amount,
      
    });
    console.log(response.data);
   console.log('category errors');
   console.log(items);
    setIdCatGoal(response.data.id_cat_goal);
  } 
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Try again.');
      }
      console.log(err);
      console.log(items['learning'].id);
      console.log('err');

    }
    }
     console.log('shut the fuck up');
     console.log(items,goal);
   ///////////////////////////////date api
   
    try {
          console.log(user);
    const response = await axios.post("http://127.0.0.1:8000/api/date", {
    start:startDate,
    end:endDate,
    });
    setIdDate(response.date);
  } 
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Try again.');
      }
      console.log("err");
      console.log(endDate>startDate);
      console.log(err)
    }
     
      
       try {
    const response = await axios.post("http://127.0.0.1:8000/api/progress", {
    id_client:user.id_client,
    id_goal:idGoal,
    id_date:idDate,
    });
    setIdDate(response.date.id_date);
  } 
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'failed');
      } else {
        setError('Network error. Try again.');
      }
    
        }
      }
    function validate(){
   //////////gaol validate
      if(salary<1) {
        errors.salary='make sure that the salary is valid'; }
      else { 
        errors.salary="";
        setAmount(salary);
      }
      if(goal['custom'].amount<0 || goal['custom'].amount>amount) {
            setGoal(prev => ({
            ...prev,  
            custom: { ...prev.custom, error: "make sure that the custom is right"}  
          }))
      }
      else  {
              setAmount(prevAmount=>prevAmount-goal['custom'].amount) ;
             setGoal(prev => ({
             ...prev,  
            custom: { ...prev.custom, error:null }  
            }))
      } 
            if(goal['save'].amount<0 || goal['save']>amount) {
               setGoal(prev => ({
            ...prev,  
            save: { ...prev.save, error:"make sure the save is valid" }  
          }))
          
      }
      else  {
              setAmount(prevAmount=>prevAmount-goal['custom'].amount) ;
              setGoal(prev => ({
            ...prev,  
            save: { ...prev.save, error: null }  
          }))
      } 
                 if(goal['invest'].amount<0 || goal['invest']>amount) {
                   setGoal(prev => ({
            ...prev,  
            invest: { ...prev.invest, error:"make sure the invest is valid" }  
          }))
      }
      else  {
              setAmount(prevAmount=>prevAmount-goal['invest'].amount) ;
                 setGoal(prev => ({
            ...prev,  
            invest: { ...prev.invest, error: null }  
          }))
      } 
      
      //////////////////////////////category validate
      setItems({...items});
      if(items['food'].amount<0||items['food'].amount>amount){
             setItems(prev => ({
            ...prev,  
            food: { ...prev.food, error: "make sure that food amount is valid"}  
          }))
      }
      
    else {
            setItems(prev => ({
            ...prev,  
            food: { ...prev.food, error: null}  
          }))
      setAmount(prevAmount=>prevAmount-items['food'].amount)
    } 
    if(items['health'].amount<0||items['health'].amount>amount)
    {
                setItems(prev => ({
            ...prev,  
            health: { ...prev.health, error: "make sure that health amount is valid"}  
          }))
    }
    else {
              setItems(prev => ({
            ...prev,  
            heatlh: { ...prev.health, error:null}  
          }))
      setAmount(prevAmount=>prevAmount-items['health'].amount)
    } 
       if(items['learning'].amount<0||items['learning'].amount>amount)
      {
            setItems(prev => ({
            ...prev,  
            learning: { ...prev.learning, error: "make sure that food amount is valid"}  
          }))
      }
    else {
                setItems(prev => ({
            ...prev,  
            learning: { ...prev.learning, error:null}  
          }))
      setAmount(prevAmount=>prevAmount-items['learning'].amount);
    } 
   
    ////////////////////////////////date validate
    const today = new Date();
          const start =new Date(startDate);
          const end = new Date(endDate);
          if(start>=today )
            errors.startDate="";
          else errors.startDate="make sure the satrt day is vlaid";      
          if(end>start)
            errors.endDate="";
          else 
            errors.endDate="make sure the satrt day is vlaid";
    
        ////////////////set all errors

      setErrors({...errors})
    for (let key in errors) {
      if(errors[key]!==""){setError(true)}
                   }
      console.log(error);

    
    }}
  return ( 
          <div className="container pt-4">
            <h2 className="col-12 text-center">let's start a new session</h2>
            <form onSubmit={handleForm}>
                <div className="row">
                    <h3 className="mt-3 m-3 col-5">goal</h3>
                    <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{salary===''?"salary":salary}</button>
                    <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{amount===''?"amount":amount}</button>
                </div>
                <div>
                    <input className={!errors.salary==""?"form-control bg-danger mt-3":"form-control mt-3 rounded-pill"} type="number"  placeholder="salary" 
                    value = {salary} onChange={(e)=>{
                    const val = parseFloat(e.target.value)
                    setSalary(val)
                    setAmount(val);
                    }}/>
                    <p className="text-danger">{errors.salary}</p>
                </div>
                <div>
                    <input className={goal['custom'].error?"form-control bg-danger mt-3":"form-control mt-3"} type="number" placeholder="custum" 
                    value = {goal['custom'].amount}                   
                      onChange={(e) => setGoal(prev => ({
                          ...prev,  
                          custom: { ...prev.custom, amount: e.target.value }  
                        }))}/>
                    <p className="text-danger">{goal['custom'].error}</p>
                </div>
                <div>
                    <input className={goal['save'].error?"form-control bg-danger mt-3":"form-control mt-3"} type="number"  placeholder="save" 
                    value = {goal['save'].amount}                   
                    onChange={(e) => setGoal(prev => ({
                          ...prev,  
                          save: { ...prev.save, amount: parseFloat(e.target.value) }  
                        }))}/>
                        <p className="text-danger">{goal['save'].error}</p>
                </div>
                <div>
                    <input className={goal['invest'].error?"form-control bg-danger mt-3":"form-control mt-3"} type="number"  placeholder="invest" 
                    value = {goal['invest'].amount}                  
                     onChange={(e) => setGoal(prev => ({
                              ...prev,  
                              invest: { ...prev.invest, amount:parseFloat(e.target.value)}  
                            }))}/>
                    <p className="text-danger">{goal['invest'].error}</p>
                </div>
                       <h3 className="mt-3 m-3 col-5">category goal</h3>
                    <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{salary===''?"salary":salary}</button>
                       <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{amount===''?"amount":amount}</button>
                              <div>
                  <input className={items['food'].error?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" value={items['food'].amount} placeholder='food' 
                  onChange={(e) => setItems(prev => ({
  ...prev,  
  food: { ...prev.food, amount: parseFloat(e.target.value) }  
}))}/>
             </div>
             <div>
                  <input className={errors.health===""?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" value={items['health'].amount} placeholder='health' 
                 onChange={(e) => setItems(prev => ({
  ...prev,  
  health: { ...prev.health, amount: parseFloat(e.target.value) }  
}))}/>
             </div>
              <div>
                <input className={items['health'].error?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" value={items['learning'].amount} placeholder='housing' 
             onChange={(e) => setItems(prev => ({
  ...prev,  
  learning: { ...prev.learning, amount: parseFloat(e.target.value) }  
}))}/>
              </div>
                  <h3 className="mt-3 m-3 col-5">date</h3>
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
                
                 <button className="mt-3 btn btn-lg col-12 rounded-pill" style={{backgroundColor:'#2c3e50'}} type="submit">done</button>
            </form> 
          </div>
         
  )
}

