import express, { json } from "express";
import cors from "cors";
import mysql from "mysql2";
import moment from "moment";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000","https://www.woodcarvingske.xyz"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); 
//   res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "online_sales",
  password: "Nairobi16.",
});

app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  con.query(query, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
app.get("/cart", (req, res) => {
  const query =
    "SELECT cart.email_address,cart.product_id,cart.quatity_ordered,products.product_price,products.product_name,products.product_image,products.product_description from cart LEFT JOIN products ON cart.product_id=products.product_id ";
  con.query(query, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/allcart", (req, res) => {
  const query = "SELECT * from cart ";
  con.query(query, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
app.get("/allcustomers", (req, res) => {
  const query = "SELECT * from customers ";
  con.query(query, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/products/:id", (req, res) => {
  const query = "SELECT * FROM products WHERE product_id=?";
  con.query(query, req.params.id, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
app.delete("/delete/:id", (req, res) => {
  const query = "DELETE FROM cart where  product_id=?";
  con.query(query, req.params.id, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
app.get("/cartitem/:id", (req, res) => {
  const query = "Select * FROM cart where  product_id=?";
  con.query(query, req.params.id, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
app.post("/newcart", (req, res) => {
  let quantity_ordered = 1;
  let date = new Date();
  let order_date = date.toGMTString();
  // const order_number =
  //   "KE" + "/" + new Date().getDate() + "/" + (new Date().getMonth() + 1);
  const query =
    "INSERT INTO cart (`email_address`,`product_id`,`order_date`,`quatity_ordered`,`price`) VALUES (?)";
  const values = [
    req.body.email_address,
    req.body.product_id,
    order_date,
    quantity_ordered,
    req.body.product_price,
  ];
  con.query(query, [values], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.put("/cart/addunits/:id/:email", (req, res) => {
  
  const query =
    "UPDATE cart SET quatity_ordered=CASE WHEN quatity_ordered < 10 THEN quatity_ordered+1 ELSE 10 END WHERE  (product_id=? AND email_address=?)";
  con.query(query, [req.params.id,req.params.email], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.put("/cart/removeunits/:id/:email2", (req, res) => {
  console.log(req.params.email2)
  console.log(req.params.id)
  const query =
    "UPDATE cart SET quatity_ordered=quatity_ordered-1 WHERE  product_id=? AND email_address=?";
  con.query(query, [req.params.id,req.params.email2], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/totalcart", (req, res) => {
  const query = "SELECT SUM(price * quatity_ordered) as totalcart from cart";
  con.query(query, req.params.id, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// sigup and login API's

// Signup test account existence
app.get("/signup/accountexists/:id", (req, res) => {
  const query = "SELECT * FROM customers WHERE email_address=?";
  con.query(query, [req.params.id], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// Signup part
app.post("/signup", (req, res) => {
  const dateToday = moment().format("lll");
  const user_id =
    "customer" + Math.floor(Math.random() * Date.now()).toString(8);
  //     .toUpperCase();
  // const specialchars = "!#*/@^~";
  // let randomchar = specialchars.charAt(Math.floor(Math.random() * 7));
  // const user_password =
  //   randomchar + "P" + Math.floor(Math.random() * Date.now()).toString(32);

  const query =
    "INSERT INTO customers (`f_name`,`l_name`,`user_id`,`email_address`,`user_password`,`role`,`user_description`,`profile_photo`,`registration_date`) VALUES (?)";
  const values = [
    req.body.f_name,
    req.body.l_name,
    user_id,
    req.body.email_address,
    req.body.password,
    "Customer",
    "Nomal Customer",
    req.body.profilephoto,
    dateToday,
  ];
  con.query(query, [values], (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

// Login in part
app.post("/login", (req, res) => {
  const query =
    "SELECT * FROM customers WHERE email_address=? and user_password=?";
  con.query(query, [req.body.email_address, req.body.password], (err, data) => {
    // console.log(data);
    if (err) throw err;
    if (data.length > 0) {
      const user_id = data[0].user_id;
      const token = jwt.sign({ user_id }, "secret_key", { expiresIn: "1h" });
      // console.log(token);
      res.cookie("token", token);
      res.json({ status: "success" });
    } else {
      res.json({ message: "Unsuccessful" });
    }
  });
});
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ Message: "We need token please provide it." });
  } else {
    jwt.verify(token, "secret_key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication error" });
      } else {
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
};
app.get("/", verifyUser, (req, res) => {
  const query = "SELECT f_name,email_address FROM customers WHERE user_id=?";
  con.query(query, [req.user_id], (err, data) => {
    if (err) throw err;
    return res.json({
      status: "success",
      user_id: req.user_id,
      name: data[0].f_name,
      email_address: data[0].email_address,
    });
  });
});

app.get("/clear", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: "success" });
});

// order placement API's

app.listen(port, () => {
  console.log("Listening on port "+ port);
});
