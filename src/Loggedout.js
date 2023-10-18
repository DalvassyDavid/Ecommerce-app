import React from "react";
import { Routes,Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Navbar from "./reusables/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ItemDisplayed from "./pages/ItemDisplayed";
import Cart from "./pages/Cart";
import { Cartstatus, loggedoutStatusForNavbar } from "./reusables/Fuctions";

function Loggedout() {
  
  return (
    <div>
      <Navbar loginstatus={loggedoutStatusForNavbar()} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/itemdisplayed/:id" element={<ItemDisplayed/>}/>
        <Route path="/cart" element={<Cart/>}/>
        
   
      </Routes>
      
    </div>
  );
}

export default Loggedout;
