import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSolidHomeCircle } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <div style={{ display: "flex", height: "12%" }} className="navbaritems">
        <div
          style={{
            width: "25%",
            fontSize: "25px",
            paddingLeft: "6px",
            paddingTop: "9px",
          }}
        >
          <img
            style={{ width: "53px" }}
            src="https://cdn-icons-png.flaticon.com/512/4072/4072164.png"
            alt="Logo"
          />{" "}
          Ooops Int'l
        </div>
        <div
          style={{ paddingTop: "10px", paddingRight: "12px", fontSize: "35px" }}
        >
          <Link to="/">
            {" "}
            <BiSolidHomeCircle size={35} />
          </Link>
        </div>
        <div style={{ width: "55%", marginTop: "2%" }}>
          <form>
            <label>
              <input
                type="text"
                placeholder="Search for a specific item"
                style={{ width: "600px" }}
              />
            </label>{" "}
            <BsSearch size={20} />
          </form>
        </div>

        {props.cartstatus}

        {props.loginstatus}
      </div>
    </>
  );
}

export default Navbar;
