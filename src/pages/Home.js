import React from "react";

import Items from "./Items";
import Categories from "./Categories";

import Contacts from "./Contacts";


function Home(props) {
  const constactstyle = {
    border: "solid",
    marginLeft:"20%",
    padding:"15px"
  };
  return (
    <div>
    <div style={{ backgroundColor: "" }}>
     
      <div
        style={{ marginTop: "6.5%", position: "fixed", top: "0", left: "15px" }}
      >
        <Categories />
      </div>
      <div style={{ marginTop: "-3%" }}>
        <Items />
      </div>
      
    </div>
    <div><Contacts/></div>
    </div>
  );
}

export default Home;
