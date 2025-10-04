
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth,} from './account/AuthContext';
import { useEffect } from 'react';
 export default function Progress() {
  const[food,setFood]=useState(0);
    const{user,token}=useAuth()||{};
    const[progress,setProgress]=useState(null);
    const[category,setCategory]=useState(null);
    const[error,setError]=useState('');
    const[items,setItems]=useState({
      food:{id:1,amount:0,updateMsg:null,error:null},
      health:{id:2,amount:0,updateMsg:null,error:null},
     learning:{id:3,amount:0,updateMsg:null,error:null},
     travel:{id:4,amount:0,updateMsg:null,error:null},
      sport:{id:5,amount:0,updateMsg:null,error:null},
    })
  const[successMsg,setSuccessMsg]=useState(null); 
  ///////////:food update hundle
    async function handleFood(e){
         e.preventDefault();
         /////////////food validate in react
         if(items['food'].amount<1||items['food'].amount>progress[0].cat_custom)
          setItems(prev => ({
            ...prev, 
            food: { ...prev.food, error:"make sure the amount is valid"}  
          }))
         
          else{
             setItems(prev => ({
            ...prev, 
            food: { ...prev.food, error:null}  
          }))
          }
          ////////Send api to update food
         try {
                const response = await axios.post("http://127.0.0.1:8000/api/update",{
                amount:items['food'].amount,
                id_client:user.id_client,
                id_cat_goal: items['food'].id,
              },);
            
                setItems(prev => ({
                      ...prev,  
                      food: { ...prev.food, updateMsg:response.data.sucess}  
                    }))
                    console.log(response.data);
                    
            }
         catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'failed');
              } else {
                setError('Network error. Try again.');
              }
              setItems(prev => ({
                    ...prev,  
                    food: { ...prev.food, updateMsg:null}  
                  }))
               }
         
    }
     async function handleHealth(e){
         e.preventDefault();
         //////////////health validate
         if(items['health'].amount<1||items['health'].amount>progress[1].cat_custom)
          setItems(prev => ({
            ...prev, 
            health: { ...prev.health, error:"make sure the amount is valid"}  
          }))
         
          else{
             setItems(prev => ({
            ...prev, 
            health: { ...prev.health, error:null}  
          }))
          }
          /////send api to update health
          try {
       const response = await axios.post("http://127.0.0.1:8000/api/update",{
       amount:items['health'].amount,
       id_client:user.id_client,
       id_cat_goal: items['health'].id,
    },);
        setItems(prev => ({
              ...prev,  
          health: { ...prev.health, updateMsg:response.data.success}  
        }))

          
  }
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'failed');
      } else {
        setError('Network error. Try again.');
      }
         setItems(prev => ({
            ...prev,  
            health: { ...prev.health, updateMsg:null}  
          }))
    }
     ////////////////learning handle
     async function handleLearning(e){
         e.preventDefault();
         /////////////learning validate in react
         if(items['learning'].amount<1||items['learning'].amount>progress[2].cat_custom)
          setItems(prev => ({
            ...prev, 
            learning: { ...prev.learning, error:"make sure the amount is valid"}  
          }))
         
          else{
             setItems(prev => ({
            ...prev, 
            learning: { ...prev.learning, error:null}  
          }))
          }
          ////////Send api to update learning
         try {
                const response = await axios.post("http://127.0.0.1:8000/api/update",{
                amount:items['learning'].amount,
                id_client:user.id_client,
                id_cat_goal: items['learning'].id,
              },);
                setItems(prev => ({
                      ...prev,  
                      learning: { ...prev.learning, updateMsg:response.data.sucess}  
                    }))
                    
            }
         catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'failed');
              } else {
                setError('Network error. Try again.');
              }
              setItems(prev => ({
                    ...prev,  
                    learning: { ...prev.learning, updateMsg:null}  
                  }))
               }
    }    
    }
    useEffect( ()=>{
      const afetch = async()=>{
         try {
    const response = await axios.get("http://127.0.0.1:8000/api/progress",{
       params:{id_client:user.id_client,id_progress:user.id_client,id_cat_goal:items['food'].id },
    },);
          setProgress(response.data);
          console.log(response.data);
  }
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'failed');
      } else {
        setError('Network error. Try again.');
      }
      console.log(err);
    }

      }
           
        if (user?.id_client) {
      afetch();  }
  

    },[]);
    useEffect(() => {
  console.log("progress updated:", progress);
}, [progress]);
   
  return (
   <div className="conatiner">
    <h2 className='pt-3 text-center fs-2'>let's track you rmoney</h2>
    <h2>{progress?progress[0].name:"nothing"}</h2>
    <div className="coantainer">
        <div className="row">
                <h2 className='pt-3 col-6 text-center'>salary:{progress?progress[0].salary:"nothing"}</h2>
                <h2 className='pt-3 col-6 text-center'>goal:{progress?progress[0].goal:"nothing"}</h2>
        </div>
        <div className='row pt-3 d-flex justify-content-center'> 
            <button className='col-3 m-3 p-3 border rounded-pill'>save:{progress?progress[0].save:"nothing"}</button>
            <button className='col-3 m-3 border rounded-pill'>invest:{progress?progress[0].invest:"nothing"}</button>
            <button className='col-3 m-3 border rounded-pill'>custom:{progress?progress[0].custom:"nothing"}</button>
        </div>
        <h2 className='pt-3'>you have 100 to custom</h2>
        <div className='pt-3 row d-flex justify-content-center'>
            <div className='col-3 m-2 p-5 border rounded-pill bg d-flex flex-column justify-content-center' style={{backgroundColor:'#f1c40f'}}>
                 <button className='mt-3 p-2 border rounded-pill ' >food:{progress?progress[0].cat_custom:"nothing"}</button>
                 <form onSubmit={handleFood}>
                  <input className='mt-3 p-2 border rounded-pill ' value={items["food"].value} type="number" placeholder='bought something?'
                        onChange={(e) => setItems(prev => ({
                          ...prev, 
                          food: { ...prev.food, amount: e.target.value }  
                        }))}/>

                  <button className="mt-3 p-2 border rounded-pill" type="submit">buy</button>
                  {items['food'].error? <p className="bg-danger border rounded-pill mt-2 p-3">items['food'].error</p>:""}
                  {items['food'].updateMsg? <p className="bg-success border rounded-pill mt-2 p-3">items['food'].updateMsg</p>:""}
                 </form>
            </div>
            <div className='col-3 m-2 p-5 border rounded-pill d-flex flex-column justify-content-center' style={{backgroundColor:'#f1c40f'}}>
              <form onSubmit={handleHealth}>
                                  <button className='mt-3 p-2 border rounded-pill'>health:{progress?progress[1].cat_custom:'nothin'}</button>
                  <input className='mt-3 p-2 border rounded-pill' type="number" placeholder='bought something?'
                                      onChange={(e) => setItems(prev => ({
                      ...prev,  
                      health: { ...prev.health, amount: e.target.value }  
                    }))}/>
                  <button className="mt-3 p-2 border rounded-pill" type="submit">buy</button>
                   {items['health'].error? <p className="bg-danger border rounded-pill mt-2 p-3">items['health'].error</p>:""}
                  {items['health'].updateMsg? <p className="bg-success border rounded-pill mt-2 p-3">items['health'].updateMsg</p>:""}
              </form>
            </div>
            <div className='col-3 m-2 p-5 border rounded-pill d-flex flex-column justify-content-center' style={{backgroundColor:'#f1c40f'}}>
                  <button className='mt-3 p-2 border rounded-pill'>learnign:{progress?progress[2].cat_custom:'nothin'}</button>
                  <input className='mt-3 p-2 border rounded-pill' type="number" placeholder='bought something?'
                   onChange={(e) => setItems(prev => ({
                    ...prev,  
                    learning: { ...prev.learning,amount: e.target.value }  
                  }))}/>
                  <button className="mt-3 p-2 border rounded-pill" type="submit">buy</button>
                  
                   {items['learning'].error? <p className="bg-danger border rounded-pill mt-2 p-3">{items['learning'].error}</p>:""}
                  {items['learning'].updateMsg? <p className="bg-success border rounded-pill mt-2 p-3">items['learning'].updateMsg</p>:""}
                          
            </div>
        </div>
    </div>
   
   </div>
  )
}

