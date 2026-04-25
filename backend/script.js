const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const dubi = "mongodb://localhost:27017/wiremind"

mongoose.connect(dubi)
.then(() => {
    
    console.log("✅ MongoDB Connected");
    app.listen(5000)
    
})
.catch((err) => {
    console.log("❌ Connection Error:", err);
});

// Your products (move from frontend to backend)
const {powerBankProducts} = require ("../frontend/scripts/data/products.js")



// API route
app.get("/api/products", (req, res) => {
  res.json(powerBankProducts);
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.json({ success: false, message: "User exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword
  });

  await user.save();

  res.json({ success: true });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({ success: false, message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id },
    "secretkey",
    { expiresIn: "1h" }
  );

  res.json({
    success: true,
    token
  });
});