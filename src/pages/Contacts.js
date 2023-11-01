import React from "react";
import { Link } from "react-router-dom";


function Contacts(props) {
  const constactstyle = {
    border: "solid",
    marginLeft:"0%",
    padding:"15px",
    marginTop:"3%",
    backgroundColor:"#282120",
    color:"white",
    borderRadius:"9px"

  };
  const linksStyle={
    color:"#FAD02C"
  }
  const today = new Date();
  return (
    <div style={constactstyle}>
        <div style={{ display: "flex",justifyContent: "space-around", color:"white"}}>
          <div><h5>Shopping guide</h5>
            <div id="linkk"><Link  style={linksStyle}>How do I pay?</Link></div>
            <div><Link style={linksStyle}>How to apply aftersale/ Refund</Link></div>
            <div><Link style={linksStyle}>How to shop</Link></div>
            <div><Link style={linksStyle}>Forgot Password?</Link></div>

          </div>
          <div> <h5>Customer Support</h5>
            <div><Link style={linksStyle}>Dispute resolution policy</Link></div>
            <div><Link style={linksStyle}>Terms and Conditions</Link></div>
            <div><Link style={linksStyle}>Account Settings</Link></div>
            <div><Link style={linksStyle}>After Sale Policy</Link></div>
            <div><Link style={linksStyle}>Delivery and Shipping</Link></div>
            <div><Link style={linksStyle}>FAQ Center</Link></div>
          </div>
          <div><h5>Payment Methods</h5>
            <div><Link style={linksStyle}>Mpesa</Link></div>
            <div><Link style={linksStyle}>Bank</Link></div>
            <div><Link style={linksStyle}>Visa</Link></div>
          </div>
        </div><br/><br/>
        <div><p style={{paddingLeft:"40%"}}>All Rights Preserved : Copyright &copy; {today.getFullYear()}</p></div>
      </div>
  )
}

export default Contacts;
