import React, { useState, useEffect } from "react";
import Navbar from "../reusables/Navbar";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
import { PiHandshake } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import Contacts from "./Contacts";
import Ordersummary from "./Ordersummary";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const { id, email_address } = useParams();

  const handleRemoveCartItem = (id) => {
    axios
      .delete("http://localhost:8000/delete/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload(true);
  };
  // Getting the email of logged in session
  const [emailofloggedinperson, setemailofloggedperson] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      if (res.data.status === "success") {
        setemailofloggedperson(res.data);
        console.log(emailofloggedinperson);
      } else {
        setemailofloggedperson("");
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cart")
      .then((res) => {
        let customerdata = res.data;
        let individualCustomerData = customerdata.filter(
          (item) => item.email_address === emailofloggedinperson.email_address
        );
        // console.log(customerdata);
        // console.log(individualCustomerData);
        setCart(individualCustomerData);
      })
      .catch((err) => console.log(err));
  }, [emailofloggedinperson]);

  const handleDecrement = (cart_id, email_address) => {
    setCart((cart) =>
      cart.map((item) =>
        (cart_id === item.product_id) &
        (item.email_address === emailofloggedinperson.email_address)
          ? {
              ...item,
              quatity_ordered:
                Number(item.quatity_ordered) -
                (item.quatity_ordered > 1 ? 1 : handleRemoveCartItem(cart_id)),
            }
          : item
      )
    );
    axios.put(
      "http://localhost:8000/cart/removeunits/" + cart_id + "/" + email_address
    );
  };

  const handleIncrement = (cart_id, email_address) => {
    setCart((cart) =>
      cart.map((item) =>
        (cart_id === item.product_id) &
        (item.email_address === emailofloggedinperson.email_address)
          ? {
              ...item,
              quatity_ordered:
                Number(item.quatity_ordered) +
                (item.quatity_ordered < 10
                  ? 1
                  : 0 &
                    alert(
                      "You reached maximum number of items that can be ordered"
                    )),
            }
          : item
      )
    );
    axios.put(
      "http://localhost:8000/cart/addunits/" + cart_id + "/" + email_address
    );
  };

  const flexItems = {
    flexBasis: "200px",
    paddingTop: "10px",
  };
  const buttonStyle = {
    width: "10px",
    color: "black",
    backgroundColor: "#F2F2F2",
    paddingTop: "1px",
    paddingBottom: "1px",
    paddingLeft: "15px",
    paddingRight: "25px",
    borderColor: "white",
    fontSize: "12px",
  };
  const emptymessage = () => {
    return (
      <>
        <div
          style={{
            paddingLeft: "360px",
            paddingTop: "10px",
            justifyContent: "center",
          }}
        >
          <img
            src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
            alt="Loading..."
            style={{ paddingLeft: "150px", width: "360px" }}
          />
          <h3>You do not have any items in the cart!</h3> <br />
          <h6 style={{ paddingLeft: "100px" }}>
            Please click{" "}
            <span>
              <Link to="/">here</Link>
            </span>{" "}
            to go back and start shopping!
          </h6>
        </div>
      </>
    );
  };
  const Emptycart = (props) => {
    return (
      <div>
        <div></div>
        <div style={{ marginTop: "100px", backgroundColor: "#5A5A5A" }}>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              fontWeight: "bold",
              marginLeft: "10px",
              fontSize: "20px",
              color: "#FAD02C",
              paddingBottom: "10px",
            }}
          >
            <div style={{ flexBasis: "500px", paddingTop: "10px" }}>
              <div>Item Selected</div>
            </div>
            <div style={flexItems}>Unit Price</div>
            <div style={flexItems}>Units</div>
            <div style={flexItems}>Amount</div>
            <div style={flexItems}>Remove</div>
          </div>
        </div>
        <div>{props.message}</div>
      </div>
    );
  };

  // Function to calculate total price after  each render

  let dollarUSLocale = Intl.NumberFormat("en-US");
  const price = cart
    .map((item) => item.product_price * item.quatity_ordered, [])
    .reduce((item, price) => item + price, 0);

  const delivery = 100;
  const tax = Math.floor(price * 0.16);
  const total = price + delivery + tax;

  return cart.length <= 0 ? (
    <Emptycart message={emptymessage()} />
  ) : (
    <>
      <Emptycart />

      {cart.map((eachcart) => {
        return (
          <div style={{ marginTop: "10px" }} key={eachcart.product_id}>
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                border: "solid",
                borderWidth: "15px",
                borderColor: "#F2F2F2",
              }}
            >
              <div style={{ display: "flex", flexBasis: "500px" }}>
                <div>
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={eachcart.product_image}
                    alt="loadibg..."
                  />
                </div>
                <div>
                  <div>{eachcart.product_name}</div>
                  <div>{eachcart.product_description}</div>
                </div>
              </div>
              <div style={flexItems}>
                Ksh {dollarUSLocale.format(eachcart.product_price)}
              </div>
              <div style={flexItems}>
                <div style={{ display: "flex" }}>
                  <button
                    style={buttonStyle}
                    onClick={() =>
                      handleDecrement(
                        eachcart.product_id,
                        emailofloggedinperson.email_address
                      )
                    }
                  >
                    -
                  </button>
                  <span style={{ paddingLeft: "12px", paddingRight: "20px" }}>
                    <div style={{ width: "7px" }}>
                      {eachcart.quatity_ordered}
                    </div>
                  </span>
                  <button
                    style={buttonStyle}
                    onClick={() =>
                      handleIncrement(
                        eachcart.product_id,
                        emailofloggedinperson.email_address
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={flexItems}>
                Ksh{" "}
                {dollarUSLocale.format(
                  eachcart.product_price * eachcart.quatity_ordered
                )}
              </div>
              <div style={flexItems}>
                <button
                  onClick={() =>
                    handleRemoveCartItem(
                      eachcart.product_id,
                      emailofloggedinperson.email_address
                    )
                  }
                  style={{
                    padding: "5px",
                    fontSize: "15px",
                    borderRadius: "15px",
                    borderColor: "white",
                  }}
                >
                  <AiTwotoneDelete /> Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          border: "solid",
          borderWidth: "30px",
          display: "flex",
          marginLeft: "2%",
          marginRight: "2%",
          marginTop: "2%",
          backgroundColor: "#F2F2F2",
          borderColor: "#F2F2F2",
          fontFamily: "Times New Roman, Times, serif",
        }}
      >
        <div
          style={{
            border: "solid",
            width: "65%",
            height: "250px",
            paddingLeft: "5px",
            borderColor: "#F2F2F2",
          }}
        >
          <div>
            <h4>What we guarantee:</h4>
            <p>
              {" "}
              <PiHandshake /> We deliver our products on Saturdays and
              Wednesdays
            </p>
            <p>
              {" "}
              <PiHandshake /> We deliver our products for free within Nairobi
            </p>
            <p>
              {" "}
              <PiHandshake /> We have 24/7 customer service to track your
              products{" "}
            </p>
            <p>
              {" "}
              <PiHandshake /> 100% gurantee amount return
            </p>
            <p>
              {" "}
              <PiHandshake /> We deliver our products on Saturdays and
              Wednesdays
            </p>
            <h5 style={{ paddingTop: "10px", marginLeft: "290px" }}>
              <Link to="/"> Continue shopping</Link>
            </h5>
          </div>
        </div>
        <Ordersummary
          price={dollarUSLocale.format(price)}
          delivery={dollarUSLocale.format(delivery)}
          tax={dollarUSLocale.format(tax)}
          total={dollarUSLocale.format(total)}
        />
      </div>

      <div>
        <Contacts />
      </div>
    </>
  );
};

export default Cart;
