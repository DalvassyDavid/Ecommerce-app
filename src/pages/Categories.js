import React from "react";
import "../App.css";

function Categories(props) {
  const categories = [
    {
      id: 1,
      category: "category_1",
    },
    {
      id: 2,
      category: "category_2",
    },
    {
      id: 3,
      category: "category_3",
    },
    {
      id: 4,
      category: "category_4",
    },
    {
      id: 5,
      category: "category_5",
    },
    {
      id: 6,
      category: "category_6",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#282120",
        height: "50vh",
        marginTop: "-5%",
        marginLeft: "-5px",
        width: "175px",
        borderRadius:"9px"
        ,
      }}
    >
      <h3 style={{ color: "white", marginLeft: "8px", paddingTop:"12px" }}>Categories</h3>
      {categories.map((item) => {
        return <li key={item.id}>{item.category}</li>;
        
      })}
    </div>
  );
}

export default Categories;
