
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
      food:{id:1,amount:0},
      health:{id:2,amount:0},
     learning:{id:3,amount:0},
     travel:{id:4,amount:0},
      sport:{id:5,amount:0},
    })
    const[errors,setErrors]=useState({
      food:"",
    });
    async function handleFood(e){
         e.preventDefault();
         if(items['food'].amount>=1) errors.food="";
         else errors.food="make sure the amount is valid";
         setErrors({...errors});
          try {
    const response = await axios.post("http://127.0.0.1:8000/api/update",{
       amount:items['food'].amount,
       id_client:user.id_client,
       id_cat_goal: items['food'].id,
    },);
      console.log(response.data);
          
  }
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'failed');
      } else {
        setError('Network error. Try again.');
      }
      console.log(error);
    }
         
    }
     async function handleHealth(e){
         e.preventDefault();
         if(items['health'].amount>=1) errors.health="";
         else errors.health="make sure the amount is valid";
         setErrors({...errors});
          try {
    const response = await axios.post("http://127.0.0.1:8000/api/update",{
       amount:items['health'].amount,
       id_client:user.id_client,
       id_cat_goal: items['health'].id,
    },);
      console.log(response.data);
          
  }
  catch (err) {
     if (err.response) {
        setError(err.response.data.message || 'failed');
      } else {
        setError('Network error. Try again.');
      }
      console.log(error);
    }
         
    }
    useEffect( ()=>{
      const afetch = async()=>{
         try {
    const response = await axios.get("http://127.0.0.1:8000/api/progress",{
       params:{id_client:user.id_client,id_progress:user.id_client,id_cat_goal:items['food'].id },
    },);
    console.log('hi');
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
  ...prev,  // ← Keep other items
  food: { ...prev.food, amount: e.target.value }  // ← Update only food value
}))}/>

                  <button className="mt-3 p-2 border rounded-pill" type="submit">buy</button>
                 </form>
            </div>
            <div className='col-3 m-2 p-5 border rounded-pill d-flex flex-column justify-content-center' style={{backgroundColor:'#f1c40f'}}>
              <form onSubmit={handleHealth}>
                                  <button className='mt-3 p-2 border rounded-pill'>health:{progress?progress[1].cat_custom:'nothin'}</button>
                  <input className='mt-3 p-2 border rounded-pill' type="number" placeholder='bought something?'
                   onChange={(e) => setItems(prev => ({
  ...prev,  // ← Keep other items
  health: { ...prev.health, amount: e.target.value }  // ← Update only food value
}))}/>
                  <button className="mt-3 p-2 border rounded-pill" type="submit">buy</button>

              </form>

            </div>
            <div className='col-3 m-2 p-5 border rounded-pill d-flex flex-column justify-content-center' style={{backgroundColor:'#f1c40f'}}>
                  <button className='mt-3 p-2 border rounded-pill'>spport:20</button>
                  <input className='mt-3 p-2 border rounded-pill' type="number" placeholder='bought something?'
                   onChange={(e) => setItems(prev => ({
  ...prev,  // ← Keep other items
  sport: { ...prev.sport, value: e.target.value }  // ← Update only food value
}))}/>
                  <button className="mt-3 p-2 border rounded-pill" type="submit">buy</button>
                          
            </div>
        </div>
    </div>
    <div className="coantainer">
        <h2>lets track</h2>
         <p>your current amount is: salary</p>
         <div className="conatianer">
            <h2>food</h2>
            <p>current amount is: </p>
            <form action="" >
                <input type="number" placeholder='you bought something'/>
            </form>
         </div>
    </div>
   </div>
  )
}

