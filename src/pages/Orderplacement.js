import React, { useEffect, useState } from "react";
import Navbar from "../reusables/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orderplacement(props) {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [seconds, setSeconds] = useState(4);
  const [isActive, setisActive] = useState(false);
  const [counteraActive, setcounteraActive] = useState(true);
  const [activeUserEmail, setactiveUserEmail] = useState("");

  // Gettting user_email from the active login session
  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      if (res.data.status === "success") {
        console.log(res.data);
        setactiveUserEmail(res.data.user_id);
      } else {
        setactiveUserEmail(false);
      }
    });
  }, [activeUserEmail]);
  console.log(activeUserEmail);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cart")
      .then((res) => {
        // console.log(res.data);
        setCart(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const price = cart
    .map((item) => item.product_price * item.quatity_ordered, [])
    .reduce((item, price) => item + price, 0);
  const delivery = 100;
  const tax = Math.floor(price * 0.16);
  const total = price + delivery + tax;

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        }
        if (seconds === 0) {
          setcounteraActive(false);
          setisActive(false);
        }
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });
  const handleClick = (e) => {
    e.preventDefault();
    setisActive(true);
  };

  // Update order table with details given
  const [data, setData] = useState({
    email_address: "",
    f_name: "",
    l_name: "",
    phone_no: "",
    city: "",
    town: "",
    location_link: "",
    descriptive_address: "",
    deliverypackage: "",
    user_id: activeUserEmail,
  });
  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };
  console.log(data);

  const handleAddOrderDetails = (e) => {
    e.preventDefault();
    const data2 = { ...data, user_id: activeUserEmail };
    console.log(data2);
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="deliveryPage">
        <div>
          <h4
            style={{
              fontWeight: "bold",
            }}
          >
            1. Delivery details{" "}
          </h4>
          <form>
            <div>
              <input
                onChange={handleChange}
                style={{
                  borderRadius: "4px",
                  width: "550px",
                  borderWidth: "1px",
                  borderColor: "orange",
                }}
                name="email_address"
                type="text"
                placeholder="Email Address"
              />
            </div>
            <p></p>
            <div>
              <input
                onChange={handleChange}
                style={{
                  borderRadius: "4px",
                  width: "250px",
                  marginRight: "20px",
                  borderWidth: "1px",
                  borderColor: "orange",
                }}
                name="f_name"
                type="text"
                placeholder="First Name"
              />
              <input
                onChange={handleChange}
                style={{
                  borderRadius: "4px",
                  width: "250px",
                  marginRight: "20px",
                  borderWidth: "1px",
                  borderColor: "orange",
                }}
                name="l_name"
                type="text"
                placeholder="Last Name"
              />
              <input
                onChange={handleChange}
                style={{
                  borderRadius: "4px",
                  width: "250px",
                  borderWidth: "1px",
                  borderColor: "orange",
                }}
                name="phone_no"
                type="text"
                placeholder="Phone Number"
              />
            </div>
            <p></p>
            <div>
              <input
                onChange={handleChange}
                style={{
                  borderRadius: "4px",
                  width: "250px",
                  marginRight: "20px",
                  borderWidth: "1px",
                  borderColor: "orange",
                }}
                name="city"
                type="text"
                placeholder="City"
              />
              <input
                onChange={handleChange}
                style={{
                  borderRadius: "4px",
                  width: "250px",
                  marginRight: "20px",
                  borderWidth: "1px",
                  borderColor: "orange",
                }}
                name="town"
                type="text"
                placeholder="Town"
              />
              <input
                onChange={handleChange}
                style={{
                  borderRadius: "4px",
                  width: "250px",
                  borderWidth: "1px",
                  borderColor: "orange",
                }}
                name="location_link"
                type="text"
                placeholder="Location Link"
              />
            </div>
            <p></p>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Note: Enter descriptive address of where you would like to pick
              the items from e.g. Location, Building, Road, Apartment/House
              Number.
            </p>
            <input
              onChange={handleChange}
              style={{
                borderRadius: "4px",
                width: "790px",
                marginRight: "50px",
                borderWidth: "1px",
                borderColor: "orange",
              }}
              name="descriptive_address"
              type="text"
              placeholder="Enter descriptive address"
            />
            <div>
              <p>
                <p></p>
                <h5
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Delivery package
                </h5>

                <input
                  onChange={handleChange}
                  type="radio"
                  id="nairobi"
                  name="deliverypackage"
                  value="0"
                />
                <label for="nairobi">
                  <div className="deliverypackageflex">
                    <div className="deliverypackage">Nairobi</div>
                    <div className="deliverypackage">Free </div>
                    <div className="deliverypackage">0-48hrs</div>
                  </div>
                </label>
                <br />
                <input
                  onChange={handleChange}
                  type="radio"
                  id="standard"
                  name="deliverypackage"
                  value="200"
                />
                <label for="standard">
                  <div className="deliverypackageflex">
                    <div className="deliverypackage">Outside Nairobi </div>
                    <div className="deliverypackage">Standard (Kes 200) </div>
                    <div className="deliverypackage">48-72hrs</div>
                  </div>
                </label>
                <br />
                <input
                  onChange={handleChange}
                  type="radio"
                  id="specialdelivery"
                  name="deliverypackage"
                  value="500"
                />
                <label for="specialdelivery">
                  <div className="deliverypackageflex">
                    <div className="deliverypackage">Special Delivery </div>
                    <div className="deliverypackage">Premium (Kes 500) </div>
                    <div className="deliverypackage">0-12hrs</div>
                  </div>
                </label>
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontWeight: "bold",
                }}
              >
                2. Payment
              </h4>
              <div>
                <img
                  style={{ width: "200px" }}
                  src="https://www.mewass.or.ke/wp-content/uploads/2022/09/customer-billing-pg-payments-logos-mpesa.png"
                  alt="Mpesa payment"
                />
              </div>
              <div>
                <p> Enter phone number: </p>
                <p>
                  <input
                    type="number"
                    name="paymentphonenumber"
                    placeholder="+254712345678"
                  />
                  <button
                    onClick={handleClick}
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "green",
                      color: "white",
                      borderColor: "white",
                      width: "60px",
                      fontSize: "15px",
                      padding: "2px",
                    }}
                  >
                    Submit
                  </button>
                  {counteraActive ? (
                    <span
                      style={{ marginLeft: "10px" }}
                    >{`${seconds} seconds`}</span>
                  ) : (
                    <span style={{ marginLeft: "10px", color: "red" }}>
                      {" "}
                      Not prompted? Please refresh the page and try again.{" "}
                    </span>
                  )}
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    You will receive a propmt in your phone. Put your pin and
                    proceed to pay.
                  </div>
                </p>
              </div>
            </div>
            <button
              type="submit"
              value="Complete Order Placement"
              style={{
                width: "400px",
                backgroundColor: "green",
                color: "white",
                height: "50px",
                padding: "0px",
                paddingBottom: "3px",
                borderRadius: "5px",
                fontSize: "25px",
                borderColor: "white",
                marginBottom: "10px",
              }}
              onClick={handleAddOrderDetails}
            >
              Complete Order Placement
            </button>
          </form>
        </div>
        <div
          style={{
            backgroundColor: "#E0E0E0",
            width: "400px",
            paddingRight: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              backgroundColor: "white",
              margin: "10px",
              paddingLeft: "10px",
              width: "380px",
              borderRadius: "4px",
            }}
          >
            <div style={{ width: "220px", padding: "20px" }}>
              <div style={{ fontWeight: "bold" }}>Order Summary</div>
              <div>Subtotal</div>
              <div>Shipping Cost</div>
              <div>Taxes</div>
              <div style={{ fontWeight: "bold" }}>Total</div>
            </div>
            <div
              style={{ width: "100px", padding: "20px", textAlign: "right" }}
            >
              <div style={{ fontWeight: "bold" }}>Ksh</div>
              <div>{dollarUSLocale.format(price)}</div>
              <div>{dollarUSLocale.format(delivery)}</div>
              <div style={{ textDecoration: "underline" }}>
                {dollarUSLocale.format(tax)}
              </div>
              <div style={{ fontWeight: "bold" }}>
                {dollarUSLocale.format(total)}
              </div>
            </div>
          </div>
          <div
            style={{
              paddingLeft: "10px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                backgroundColor: "white",
                textAlign: "center",
                fontSize: "20px",
                textDecoration: "underline",
              }}
            >
              View Cart
            </div>
            <div style={{ maxHeight: "210px", overflowY: "scroll" }}>
              {cart.map((item) => {
                return (
                  <div
                    className="viewcartitems"
                    style={{
                      display: "flex",
                      backgroundColor: "white",
                      borderBottom: "solid",
                      borderWidth: "1px",
                      borderRadius: "4px",
                    }}
                    key={item.product_id}
                  >
                    <div>
                      <img
                        style={{
                          width: "100px",
                          height: "80px",
                          margin: "10px",
                        }}
                        src={item.product_image}
                        alt="loading"
                      />
                    </div>
                    <div
                      style={{ width: "250px", height: "50px", margin: "15px" }}
                    >
                      <div style={{ fontWeight: "bold" }}>
                        {item.product_name}
                      </div>
                      <div>
                        {item.quatity_ordered}
                        {item.quatity_ordered === "1" ? " unit" : " units"}
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "orange",
                          textAlign: "end",
                        }}
                      >
                        Ksh {dollarUSLocale.format(item.product_price)}/-
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* "Let's talk chat box" */}
          <div
            style={{
              margin: "10px",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src="https://aic.cdn.neptuneweb.com/student-life/wp-content/uploads/sites/10/2023/09/Lets-Talk-color-1024x587.png?x72543"
                alt="Loading..."
                style={{ width: "120px" }}
              />{" "}
            </div>
            <input
              style={{
                height: "40px",
                width: "350px",
                borderRadius: "4px",
                borderWidth: "1px",
                borderColor: "orange",
                marginTop: "10px",
              }}
              type="text"
              placeholder="Enter you name"
            />
            <input
              style={{
                height: "40px",
                width: "350px",
                borderRadius: "4px",
                borderWidth: "1px",
                borderColor: "orange",
                marginTop: "10px",
              }}
              type="text"
              placeholder="Enter you Email"
            />
            <input
              style={{
                height: "100px",
                width: "350px",
                borderRadius: "4px",
                borderWidth: "1px",
                borderColor: "orange",
                marginTop: "10px",
              }}
              type="text"
              placeholder="Message"
            />
            <br />
            <input
              style={{
                height: "30px",
                width: "350px",
                borderRadius: "4px",
                borderWidth: "1px",
                borderColor: "orange",
                marginTop: "10px",
                backgroundColor: "green",
                color: "white",
              }}
              type="submit"
              placeholder="Enter you Email"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orderplacement;
