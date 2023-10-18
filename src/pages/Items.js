import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

function Items(props) {
  // Get all products from the store and display them
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/products").then((res) => {
      setItems(res.data);
    });
  }, []);

  // Quick search button
  const [search, setsearch] = useState("");

  const allItems = () => {
    return (
      <>
        <div style={{ marginTop: "10%", marginLeft: "15%" }}>
          <div style={{ width: "45%", marginTop: "2%", marginLeft: "200px" }}>
            <div style={{ display: "flex" }}>
              <div>
                <label>
                  <input
                    type="text"
                    placeholder="Quick search for a specific item"
                    name="searchitem"
                    style={{ width: "600px", borderRadius: "15px" }}
                    onChange={(e) => setsearch(e.target.value)}
                  />
                </label>{" "}
              </div>
              <div style={{ marginLeft: "-5%", marginTop: "1%" }}>
                <BsSearch size={20} />
              </div>
              <div style={{ marginLeft: "5%" }}>
                <button
                  style={{
                    width: "100px",
                    height: "35px",
                    padding: "1px",
                    fontSize: "20px",
                    borderColor: "white",
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxHeight: "1000px",
              overflowY: "scroll",
            }}
          >
            {items
              .filter((item) => {
                return search.toLocaleLowerCase() == ""
                  ? item
                  : item.product_name.toLocaleLowerCase().includes(search) ||
                      item.product_description
                        .toLocaleLowerCase()
                        .includes(search);
              })
              .map((item, key) => {
                return (
                  <div key={item.id} className="boxforitem">
                    <img
                      style={{
                        width: "250px",
                        height: "200px",
                        border: "solid",
                        borderBlockEndWidth: "1px",
                        borderColor: "orange",
                      }}
                      src={item.product_image}
                      alt="loading ..."
                    />
                    <div
                      style={{
                        padding: "5px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.product_name}
                    </div>
                    <div
                      style={{
                        padding: "5px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.product_description}
                    </div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        padding: "5px",
                      }}
                    >
                      KSh{" "}
                      {item.product_price.replace(
                        /(\d)(?=(\d{3})+(?!\d))/g,
                        "$1,"
                      )}{" "}
                      /=
                    </div>
                    <div>
                      <Link to={`/itemdisplayed/${item.product_id}`}>
                        <button
                          style={{
                            width: "100%",
                            padding: "5px",
                            fontWeight: "bold",
                            fontSize: "18px",
                            borderColor: "white",
                          }}
                        >
                          VIEW ITEM
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  };

  return <>{allItems()}</>;
}

export default Items;
