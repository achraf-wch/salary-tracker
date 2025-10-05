
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../account/AuthContext';
export default function Session() {
    const[salary,setSalary]=useState('');
    const{user,token}=useAuth()||{};     
    const[error,setError]=useState('');
    const[amount,setAmount]=useState("");////initalize with salary, so the client could follow his salary
    /////////intialize with custom, so the client could use custom in goal to determine categories
    const[catAmount,setCatAmount]=useState("");
     ///////////the goal
     const[goal,setGoal]=useState({
     save:{amount:null,error:null},
     invest:{amount:null,error:null},
     custom:{amount:null,error:null},
     idGoal:{id:null},
     });
     const[successMsg,setSuccessMsg]=useState(null);/////msg of success add
    //////////categories
    const[items,setItems]=useState({
            food:{id:1,amount:null,error:null},
            health:{id:2,amount:null,error:null},
            learning:{id:3,amount:null,error:null},
            travel:{id:4,amount:null,error:null},
            sport:{id:5,amount:null,error:null},
      });
      //////////dates
      const[dates,setDates]=useState({
        start:{date:new Date(),error:null},
        end:{date:new Date(),error:null},
      });
    async function handleForm(e){
        e.preventDefault();
        validate();///////function to validate the data 
  ////////send an api and only if there is no errors will pass to send the next api
  ////////send api to goal///////////////////////
  if(user){//////////to make sure of the user
          try {
              const response = await axios.post("http://127.0.0.1:8000/api/goal", {
              id_client:user.id_client,
              custom:goal['custom'].amount,
              save:goal['save'].amount,
              invest:goal['invest'].amount,
              });
              let idGoal = response.data.id_goal;/////to be used in table progress
              ///////////////send api to food
              if(items['food'].amount>=0){
                try {
                  const response = await axios.post("http://127.0.0.1:8000/api/cat_goal", {
                    id_client:user.id_client,
                    id_category:items['food'].id,
                    cat_custom:items['food'].amount,
                  });
                  
                  ///////////////send api to health///////////////
                    if(items['health'].amount>=0){
                       try {
                        const response = await axios.post("http://127.0.0.1:8000/api/cat_goal", {
                          id_client:user.id_client,
                          id_category:items['health'].id,
                          cat_custom:items['health'].amount,
                        });
                        ///////////////////////send api to learning/////////////////                   
                        if(items['learning'].amount>0){
                          try {
                            const response = await axios.post("http://127.0.0.1:8000/api/cat_goal", {
                              id_client:user.id_client,
                              id_category:items['learning'].id,
                              cat_custom:items['learning'].amount,
                            })
                            ////////////send api to date/////////////////
                            try {
                              const response = await axios.post("http://127.0.0.1:8000/api/date", {
                              start:dates['start'].date,
                              end:dates['end'].date,
                              });
                              let idDate=response.date.id_date;
                              ///////////////////send api to progress/////
                              ////////progress here means a session so it has all informations
                              console.log('progress time');
                              try {
                                const response = await axios.post("http://127.0.0.1:8000/api/progressCreate", {
                                id_client:user.id_client,
                                id_goal:idGoal,
                                id_date:idDate,
                                });
                              } 
                              catch (err) {
                               if (err.response) {
                                    setError(err.response.data.message || 'failed');
                                  } else {
                                    setError('Network error. Try again.');
                                  }
                                    }
                              } 
                            catch (err) {
                              if (err.response) {
                                  setError(err.response.data.message);
                                } else {
                                  setError('Network error. Try again.');
                                }
                              }

                          } 
                        catch (err) {
                          if (err.response) {
                              setError(err.response.data.message);
                            } else {
                              setError('Network error. Try again.');
                            }
                          }
                          }
                        } 
                      catch (err) {
                        if (err.response) {
                            setError(err.response.data.message);
                          } else {
                            setError('Network error. Try again.');
                          }
                          console.log(err);
                          console.log(items['health'].id);
                          console.log(items['health'].amount);
                        }
                        }
                } 
                catch (err) {
                  if (err.response) {
                      setError(err.response.data.message);
                    } else {
                      setError('Network error. Try again.');
                    }
                    console.log(err);
                  }
              }
          
        } 
        catch (err) {
          if (err.response) {
              setError(err.response.data.message);
            } else {
              setError('Network error. Try again.');
            }
            console.log(err);     
    }  
      }
    function validate(){
   //////////gaol validate
      if(salary>1) {
       
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
            setCatAmount(goal['custom'].amount);
      } 
            if(goal['save'].amount<0 || goal['save'].amount>amount) {
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
                 if(goal['invest'].amount<0 || goal['invest'].amount>amount) {
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
      if(items['food'].amount<0||items['food'].amount>catAmount){
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
      setCatAmount(prevCatAmount=>prevCatAmount-items['food'].amount)
   
      
    } 
    if(items['health'].amount<0||items['health'].amount>catAmount)
    {
                setItems(prev => ({
            ...prev,  
            health: { ...prev.health, error: "make sure that health amount is valid"}  
          }))
          
    }
    else {
              setItems(prev => ({
            ...prev,  
            health: { ...prev.health, error:null}  
          }))
      setCatAmount(prevCatAmount=>prevCatAmount-items['health'].amount)
    } 
       if(items['learning'].amount<0||items['learning'].amount>catAmount)
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
      setCatAmount(prevCatAmount=>prevCatAmount-items['learning'].amount);
      console.log(amount);
    } 
   
    ////////////////////////////////date validate
    const today = new Date();
          const start =new Date(dates['start'].date);
          const end = new Date(dates['end'].date);
          if(start>=today )
           {
            setDates(prev => ({
            ...prev,  
            start: { ...prev.start, error:null}
          }))
           }
          else {
            setDates(prev => ({
            ...prev,  
            start: { ...prev.start, error:"make sure the start day is vlaid"}
          }))}     
          if(end>start)
          {
             setDates(prev => ({
            ...prev,  
            end: { ...prev.end, error:null}
          }))
          }
          else {
             setDates(prev => ({
            ...prev,  
            end: { ...prev.end, error:"make sure the end day is vlaid"}
          }))
          }
    }}
  return ( 
          <div className="container pt-4">
          <h2>{items['food'].error}</h2>
          <h2 className="col-12 text-center">let's start a new session</h2>
          <form onSubmit={handleForm}>
                <div className="row">
                    <h3 className="mt-3 m-3 col-5">goal</h3>
                    <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{salary===''?"salary":salary}</button>
                    <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{amount===''?"amount":amount}</button>
                </div>
                <div>
                    <input className={salary<1?"form-control bg-danger mt-3":"form-control mt-3 rounded-pill"} type="number"  placeholder="salary" 
                    value = {salary} onChange={(e)=>{
                    const val = parseFloat(e.target.value)
                    setSalary(val)
                    setAmount(val);
                    }}/>
                    <p className="text-danger">{salary<1}</p>
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
                    <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{salary===''?"custom":goal['custom'].amount}</button>
                       <button className="mt-3 m-3 p-2 rounded-pill col-2" style={{backgroundColor:'#f1c40f'}}>{amount===''?"amount":catAmount}</button>
                              <div>
                  <input className={!items['food'].error?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" value={items['food'].amount} placeholder='food' 
                  onChange={(e) => setItems(prev => ({
  ...prev,  
  food: { ...prev.food, amount: e.target.value }  
}))}/>
<p className="text-danger">{items['food'].error}</p>
             </div>
             <div>
                  <input className={!items['health'].error?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" value={items['health'].amount} placeholder='health' 
                 onChange={(e) => setItems(prev => ({
  ...prev,  
  health: { ...prev.health, amount: e.target.value }  
}))}/>
<p className="text-danger">{items['health'].error}</p>
             </div>
              <div>
                <input className={!items['learning'].error?"form-control mt-3":"form-control mt-3 bg-danger"} type="text" value={items['learning'].amount} placeholder='housing' 
             onChange={(e) => setItems(prev => ({
  ...prev,  
  learning: { ...prev.learning, amount: e.target.value }  
}))}/>
<p className="text-danger">{items['learning'].error}</p>
              </div>
                  <h3 className="mt-3 m-3 col-5">date</h3>
              <div>
                  <input type="date" className={!dates['start'].error?"form-control col-12" :"form-control col-12 bg-danger"} placeholder='start date'
                  value = {dates['start'].date} onChange={(e)=>{
                     setDates(prev => ({
                      ...prev,  
                      start: { ...prev.start, date:e.target.value}
          }))
                  }}/>
                  {!dates['start'].error?"":<p className='bg-danger'>{dates['start'].error}</p>}
              </div>
              <div>
                    <input type="date" className={!dates['end'].error?"form-control mt-3" :"form-control mt-3 bg-danger" }placeholder='end date'
                    value = {dates['end'].date} onChange={(e)=>{
                     setDates(prev => ({
                      ...prev,  
                      end: { ...prev.end, date:e.target.value}
          }))
                    }}/>
                    {!dates['end'].error?"":<p className='bg-danger'>{dates['end'].error}</p>}
              </div>
                
                 <button className="mt-3 btn btn-lg col-12 rounded-pill" style={{backgroundColor:'#2c3e50'}} type="submit">done</button>
            </form> 
          </div>
         
  )
}

