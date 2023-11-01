import { RiLoginCircleLine } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
// import { GiPadlockOpen } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidCart } from "react-icons/bi";

const loggedoutStatusForNavbar = () => {
  return (
    <>
      <div style={{ width: "7%", marginTop: "2%" }}>
        {" "}
        <RiLoginCircleLine size={23} />{" "}
        <Link to="/login" className="links">
          Login
        </Link>
      </div>
      <div style={{ width: "7%", marginTop: "2%", paddingRight: "3px" }}>
        {" "}
        <SiGnuprivacyguard size={18} />{" "}
        <Link to="/signup" className="links">
          Sign Up
        </Link>
      </div>
    </>
  );
};

const LoggedinStatusForNavbar = (props) => {
  const navigate = useNavigate();
  const handleClearCookie = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/clear")
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/login");
          window.location.reload(true);
        } else {
          console.log("unlogoutable");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div style={{ width: "7%", marginTop: "2%", paddingRight: "3px" }}>
        {" "}
        {/* <GiPadlockOpen size={18} />{" "} */}
        <Link to="" className="links">
          {props.nameofloggedinperson}
        </Link>
      </div>
      <div style={{ width: "7%", marginTop: "2%", paddingLeft: "2px" }}>
        <button
          style={{
            width: "55px",
            padding: "3px",
            fontSize: "14px",
            color: "white",
            backgroundColor: "red",
            fontWeight: "bold",
          }}
          onClick={handleClearCookie}
        >
          Logout
        </button>
      </div>
    </>
  );
};
const Cartstatus = () => {
  const [cart, setCart] = useState(0);
  const [emailofloggedinperson, setemailofloggedperson] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      if (res.data.status === "success") {
        setemailofloggedperson(res.data.email_address);
      } else {
        setemailofloggedperson("");
      }
    });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/cart")
      .then((res) => {
        let alldata=res.data
        let individualCustomerDataLength=alldata.filter((item)=>item.email_address===emailofloggedinperson)
        console.log(emailofloggedinperson)
        setCart(individualCustomerDataLength.length);

      })
      .catch((err) => console.log(err));
  }, [emailofloggedinperson]);
  return (
    <>
      <div
        style={{
          width: "7%",
          display: "flex",
          marginTop: "2%",
          fontWeight: "bold",
        }}
      >
        {" "}
        <BiSolidCart size={23} />{" "}
        <div>
          <Link to="/cart" className="links">
            Cart
          </Link>
        </div>{" "}
        <div
          style={{
            color: "white",
            fontSize: "12px",
            border: "solid",
            borderRadius: "100px",
            height: "22px",
            paddingBottom: "2px",
            paddingLeft: "3px",
            paddingRight: "3px",
            marginLeft: "3px",
            marginBottom: "13px",
            backgroundColor: "white",
            color: "red",
          }}
        >
          {" "}
          {cart}
        </div>
      </div>
    </>
  );
};
export { loggedoutStatusForNavbar, LoggedinStatusForNavbar, Cartstatus };
