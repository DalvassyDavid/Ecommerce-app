import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [inputvalues, setinputValues] = useState({
    email_address: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...inputvalues };
    newData[e.target.name] = e.target.value;
    setinputValues(newData);
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", inputvalues)
      .then((res) => {
        console.log(res.data)
        if (res.data.status === "success") {
          navigate("/");
          window.location.reload(true);
        } else {
            alert("user doest exist,please proceed to signup");
            navigate("/signup")
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div
        className="wrapper"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/86/f0/1a/86f01ab226e0f7505df7e2f4f71c5dfb.jpg)",
        backgroundSize:"cover"

        }}
      >
        <div style={{ width: "12%", marginLeft: "19px" }}>
          <img
            style={{ width: "630%", height: "85vh", borderRadius: "27px",opacity:"0.8" }}
            src="https://t4.ftcdn.net/jpg/05/78/04/61/360_F_578046115_TYzr8fB2xT7h55E1yrxY5fwA76YgCTsY.jpg"
            alt="logo"
          />
        </div>
        <div
          className="registration_form"
          style={{ marginLeft: "58%", marginRight: "10px" }}
        >
          <div className="title">Login</div>
          <form onSubmit={handleClick}>
            <div className="form_wrap">
              <div className="input_wrap">
                <label htmlFor="email_address">Email Address</label>
                <input
                  type="email"
                  id="email_address"
                  name="email_address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_wrap">
                <input type="submit" value="Login" className="submit_btn" />
              </div>
              <div>Do not have an account? <Link to ="/signup"> Register here</Link></div>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
