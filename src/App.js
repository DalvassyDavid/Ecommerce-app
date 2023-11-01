import React, { useEffect, useState } from "react";
import Loggedout from "./Loggedout";
import Loggedin from "./Loggedin";
import axios from "axios";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      if (res.data.status === "success") {
        console.log(res.data)
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        
        
      }
    })
  }, []);
  return <div>{authenticated ? <Loggedin /> : <Loggedout />}</div>;
}

export default App;
