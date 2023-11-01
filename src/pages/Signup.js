import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  //Lets do this!!!
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputValues, setinputValues] = useState({
    f_name: "",
    l_name: "",
    email_address: "",
    password: "",
    confirm_password: "",
    profilephoto: "https://i.pngimg.me/thumb/f/720/m2i8G6H7G6G6N4d3.jpg",
  });
  const [inputfieldcolors, setinputfieldcolors] = useState("black");
  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...inputValues };
    newData[e.target.name] = e.target.value;
    setinputValues(newData);
    
  };

  useEffect(() => {
    if (inputValues.password !== inputValues.confirm_password) {
      return setinputfieldcolors("red");
    } else {
      return setinputfieldcolors("green");
    }
  }, [inputValues]);

  const handleAddCustomerDetails = (e, id) => {
    e.preventDefault();
    //validate Names and passwords
    const validate = /^[a-z]([0-9]{2,}|[a-z]+\d*)$/i;
    const validatePassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (
      validate.test(inputValues.f_name) === false ||
      inputValues.f_name.length <= 2 ||
      inputValues.f_name.length >= 21
    ) {
      alert(
        "First name should be between 3 and 20 characters long and without any special characters "
      );
      return;
    };
    if (
      validate.test(inputValues.l_name) === false ||
      inputValues.l_name.length <= 2 ||
      inputValues.l_name.length >= 21
    ) {
      alert(
        "Last name should be between 3 and 20 characters long and without any special characters "
      );
      return;
    };
    if (validatePassword.test(inputValues.password) === false) {
      alert(
        "Password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character "
      );
      return;
    }

    if (inputValues.password === inputValues.confirm_password) {
      axios
        .get("http://localhost:8000/signup/accountexists/" + id)
        .then((res) => {
          if (res.data.length > 0) {
            alert("Account with the given email address exists. Please login");
            navigate("/login");
          } else {
            axios
              .post("http://localhost:8000/signup", inputValues)
              .then((res) => {
                alert("Account created. Proceed to login page and login");
                navigate("/login");
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords should match!");
    }
  };

  return (
    <div>
      <div
        className="wrapper"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/86/f0/1a/86f01ab226e0f7505df7e2f4f71c5dfb.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div style={{ width: "12%", marginLeft: "19px" }}>
          <img
            style={{
              width: "700%",
              height: "85vh",
              borderRadius: "27px",
              opacity: "0.8",
            }}
            src="https://t4.ftcdn.net/jpg/05/78/04/61/360_F_578046115_TYzr8fB2xT7h55E1yrxY5fwA76YgCTsY.jpg"
            alt="logo"
          />
        </div>
        <div
          className="registration_form"
          style={{ marginLeft: "58%", marginRight: "10px" }}
        >
          <div className="title">Signup</div>
          <form
            onSubmit={(e, id) =>
              handleAddCustomerDetails(e, inputValues.email_address)
            }
          >
            <div className="form_wrap">
              <div className="input_grp">
                <div className="input_wrap">
                  <label htmlFor="f_name">First Name</label>
                  <input
                    type="text"
                    id="f_name"
                    name="f_name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input_wrap">
                  <label htmlFor="l_name">Last Name</label>
                  <input
                    type="text"
                    id="l_name"
                    name="l_name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
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
                  style={{ color: inputfieldcolors }}
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  style={{ color: inputfieldcolors }}
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  onChange={handleChange}
                />
              </div>
              <div className="input_wrap">
                <input
                  type="submit"
                  value="Register Now"
                  className="submit_btn"
                />
              </div>
              <div>
                Already has an account? <Link to="/login"> Login here</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
