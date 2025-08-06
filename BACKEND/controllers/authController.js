const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.js");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }
    if (password < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      success: true,
      messsage: "User created successfully",
      token,
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      success: true,
      messsage: "User logged in successfully",
      token,
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

module.exports = {register, login};
