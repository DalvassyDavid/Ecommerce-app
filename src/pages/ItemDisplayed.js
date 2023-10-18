import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Categories from "./Categories";
import { useNavigate } from "react-router-dom";
import Contacts from "./Contacts";

function ItemDisplayed(props) {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleNavigate = (props) => {
    navigate(props);
  };

  // Getting the email of logged in session
  const [emailofloggedinperson, setemailofloggedperson] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      if (res.data.status === "success") {
        setemailofloggedperson(res.data.email_address);
      } else {
        setemailofloggedperson("");
      }
    });
  }, [emailofloggedinperson]);

  // Getting the unique item selected by the client
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/products/" + id)
      .then((res) => {
        // console.log(res.data[0]);
        setItems(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handClickAddItemToCart = (id) => {
    if (emailofloggedinperson === "") {
      alert("Please login to continue");
      navigate("/login")
    } else {
      axios.get("http://localhost:8000/cart").then((res) => {
        if (res.data.length <= 500) {
          axios
            .get("http://localhost:8000/cartitem/" + id)
            .then((res) => {
              let allcartitems=res.data
              let individualcartaddeditems=allcartitems.filter((item)=>(item.email_address===emailofloggedinperson & item.product_id===items.product_id) )

              console.log(res.data);
              console.log(individualcartaddeditems);
              
              if (individualcartaddeditems.length > 0) {
                alert("Item already added to cart");
              } else {
                axios
                  .post("http://localhost:8000/newcart", {
                    email_address: emailofloggedinperson,
                    product_id: items.product_id,
                    product_price: items.product_price,
                  })
                  .then(() =>{
                    alert(
                      "Success! Item added to cart. Click 'OK' to view added item!"
                    )
                    
                  }
                    
                    
                  )
                  .then(() => {
                    navigate("/cart");
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        } else {
          alert(
            "You cannot add more items to cart. Remove some items to continue adding others"
          );
        }
      });
    }
  };

  const imageStyle2 = {
    border: "solid",
    borderWidth: "5px",
    borderColor: "#D3D3D3",
    display: "flex",
    borderRadius: "10px",
  };

  const AllItems2 = () => {
    return (
      <>
        <div style={{ marginTop: "6%", marginLeft: "15%" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={imageStyle2}>
              <img
                style={{
                  width: "500px",
                  height: "400px",
                  border: "solid",
                  borderWidth: "1px",
                  borderColor: "grey",
                }}
                src={items.product_image}
                alt="loading..."
              />

              <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <div
                  style={{
                    padding: "5px",
                    height: "50px",
                    width: "300px",
                    borderBottom: "solid",
                    borderWidth: "1px",
                    borderRadius: "3px",
                  }}
                >
                  {items.product_description}
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    padding: "5px",
                    borderBottom: "solid",
                    borderWidth: "1px",
                    borderRadius: "3px",
                  }}
                >
                  Price: Kes {items.product_price}/={" "}
                </div>
                <div
                  style={{ padding: "10px", width: "300px", height: "250px" }}
                >
                  <h6>More details about this item:</h6>
                  <p>--Cat cat acat acata cataataca acatatta cattat</p>
                  <p>--Cat cat acat acata cataataca </p>
                  <p>--Cat cat acat acata cataataca acatatta </p>
                  <p>--Cat cat acat acata cataataca acatatta cattat</p>
                </div>

                <div>
                  <button
                    onClick={() => handClickAddItemToCart(items.product_id)}
                    style={{
                      width: "100%",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "18px",
                      borderColor: "white",
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                paddingLeft: "14px",
                backgroundColor: "grey",
                width: "150px",
              }}
            >
              {" "}
              <marquee>Advertisement</marquee>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleNavigate("/")}
              style={{
                width: "50%",
                padding: "5px",
                fontWeight: "bold",
                fontSize: "18px",
                borderColor: "white",
              }}
            >
              {"<<"} Go back to home page
            </button>
          </div>
        </div>
      </>
    );
  };

  // Render part
  return (
    <>
      <div
        style={{ marginTop: "7%", position: "fixed", top: "0", left: "15px" }}
      >
        <Categories />
      </div>
      <div>
        <AllItems2 />
      </div>
      <div>
        <Contacts />
      </div>
    </>
  );
}

export default ItemDisplayed;
