import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Ordersummary = (props) => {
  const navigate = useNavigate();
  const handleNagivate=()=>{
    axios.get("http://localhost:8000").then((res) => {
      if (res.data.status === "success") {
        navigate("/orderplacement");
      } else {
        alert("Please login or signup to continue")
        navigate("/login")
        
        
      }
    })
    
  }
  return (
    <div
      style={{
        border: "solid",
        borderColor: "grey",
        borderRadius: "15px",
        width: "33%",
        marginLeft: "25%",
        height: "250px",
        padding: "10px",
        backgroundColor: "white",
      }}
    >
      <h3>Order Summary</h3>
      <div style={{ display: "flex" }}>
        <div>
          <h5>Subtotal :</h5>
          <h5>Delivery Amount :</h5>
          <h5>Tax :</h5>
        </div>
        <div style={{ marginLeft: "90px", textAlign: "right" }}>
          <h5>{props.price}</h5>
          <h5>{props.delivery}</h5>
          <h5 style={{ textDecoration: "underline" }}>{props.tax}</h5>
        </div>
      </div>
      <h3 style={{ textAlign: "center" }}>Total = Ksh {props.total}</h3>
      <button
        onClick={handleNagivate}
        style={{
          fontSize: "20px",
          borderColor: "white",
          fontWeight: "bold",
          marginLeft: "1px",
          height: "50px",
          padding: "9px",
          borderRadius: "17px",
          width: "350px",
        }}
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
};
export default Ordersummary;
