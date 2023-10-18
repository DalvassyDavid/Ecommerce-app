import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./reusables/Navbar";
import ItemDisplayed from "./pages/ItemDisplayed";
import Cart from "./pages/Cart";
import Orderplacement from "./pages/Orderplacement";
import {
  Cartstatus,
  LoggedinStatusForNavbar,
  loggedinStatusForNavbar,
} from "./reusables/Fuctions";
import axios from "axios";

function Loggedin() {
  const [nameofloggedperson, setnameofloggedperson] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      if (res.data.status === "success") {
        setnameofloggedperson(res.data.name);
      } else {
        setnameofloggedperson("");
      }
    });
  }, []);

  return (
    <div>
      <Navbar
        loginstatus={
          <LoggedinStatusForNavbar nameofloggedinperson={nameofloggedperson} />
        }
        cartstatus={<Cartstatus />}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itemdisplayed/:id" element={<ItemDisplayed />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderplacement" element={<Orderplacement />} />
      </Routes>
    </div>
  );
}

export default Loggedin;
