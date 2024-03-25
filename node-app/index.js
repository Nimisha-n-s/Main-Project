const express = require("express");
const cors = require("cors");
const path = require("path");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const productController = require("./controllers/productController");
const userController = require("./controllers/userController");
require('color')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
const bodyParser = require("body-parser");
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nimisha-:nemo@cluster0.3cj53h1.mongodb.net/?retryWrites=true&w=majority",
).then(function (connection) {
    console.log("connected to db");
});

app.get("/", (req, res) => {
  res.send("hello...");
});

app.get("/search", productController.search);
app.post("/like-product", userController.likeProducts);
app.post(
  "/add-product",
  upload.fields([{ name: "pimage" }, { name: "pimage2" }]),
  productController.addProduct,
);
app.get("/get-products", productController.getProducts);
app.get("/get-product/:pId", productController.getProductsById);
app.post("/liked-products", userController.likedProducts);
app.post("/my-products", productController.myProducts);
app.post("/signup", userController.signup);
app.get("/my-profile/:userId", userController.myProfileById);
app.get("/get-user/:uId", userController.getUserById);
app.post("/login", userController.login);
app.post("/createadmin", userController.createAdmin);
app.post("adminlogin", userController.adminLogin);
//app.delete('/users/:userId', adminController.deleteUser);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
