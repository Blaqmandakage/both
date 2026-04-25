require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("./modules/product");

const app = express();

// app.use(cors());

app.use(cors({
  origin: [
    "http://127.0.0.1:5501",
    "http://localhost:5501"
  ]
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

//add product to mongoDb
app.post("/api/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

const dubi = process.env.MONGO_URI;

mongoose.connect(dubi)
.then(() => {
  console.log("✅ MongoDB Connected");

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log("❌ Connection Error:", err);
});

/*
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
*/

/*
//firdt testing
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
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    success: true,
    token
  });
});
*/

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ success: false, message: "All fields required" });
    }

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

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ success: false, message: "Wrong password" });
    }
  if (!process.env.JWT_SECRET) {
  return res.status(500).json({ success: false, message: "JWT not configured" });
  }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});



//route check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});