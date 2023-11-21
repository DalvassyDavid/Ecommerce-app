import React from "react";

function Orderplacementmessage(props) {
  return (
    <div
      style={{
        border: "solid",
        width: "600px",
        backgroundColor: "green",
        color: "white",
        height: "40px",
      }}
    >
      <p style={{ padding: "5px" }}>
        The order has been placed successfully. Please check your email address
        to trace the order.{" "}
      </p>
    </div>
  );
}

export default Orderplacementmessage;
