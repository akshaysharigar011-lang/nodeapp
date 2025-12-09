const User = require("../models/user");
const jwt = require("jsonwebtoken");


//Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const newUser = new User({ name, email, password });
    await newUser.save();


    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
};


// Login user and generate JWT token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });


    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }


    // ✅ Generate JWT Token
    const token = jwt.sign(
      { email: user.email, name: user.name }, //payload
      process.env.JWT_SECRET, //secret key
      { expiresIn: "1h" } // token validity formats: 1h, 10m, 10s & 1d
    );


    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.json({ message: "Profile fetched successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err });
  }
};


module.exports = { registerUser, loginUser, getProfile };
