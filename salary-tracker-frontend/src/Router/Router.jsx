import { BrowserRouter,Routes,Route } from "react-router-dom";
import react from "react";
import Home from '../Pages/Home';
import MyAccount from '../Pages/MyAccount';
import MyProgress from '../Pages/MyProgress';
import NewSession from '../Pages/NewSession';
import Login from "../Pages/Login";
import Regester from "../Pages/Regester";

const Router=()=>
{
    return (
           <Routes>
               <Route />
                 <Route path="/" element = {<Home/>}/>
               <Route path="/MyAccount" element = {<MyAccount/>}/>
               <Route path="/MyProgress" element = {<MyProgress/>}/>
               <Route path="/NewSession" element = {<NewSession/>}/>
               <Route path="/Login" element = {<Login/>}/>
               <Route path="Regester" element = {<Regester/>}/>
           </Routes>

    )
  
};
export default Router;
