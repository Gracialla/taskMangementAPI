import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Op } from "sequelize";

dotenv.config();

// Mailtrap transporter
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Create User and Send Welcome Email
export const createUser = async (req, res) => {
  const { email, password, name } = req.body;

  const checkEmail = await User.findOne({ where: { email } });

  if (checkEmail) {
    return res.status(400).json({
      status: false,
      message: "Email has been used",
      data: [],
    });
  }

  const hashed_password = bcrypt.hashSync(password, 10);

  const user = await User.create({ email, name, password: hashed_password });

  if (!user) {
    return res.status(400).json({
      status: false,
      message: "Could not create the user",
      data: [],
    });
  }

  // Send welcome email
    await transporter.sendMail({
      from: `"Task Management" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: "Welcome to Task Management Platform!",
      html: `<p>Hello <strong>${user.name}</strong>, welcome to Task Management Platform!</p>`,
    });

  return res.status(201).json({
    status: true,
    message: "User registered successfully",
    data: user,
  });
};

//User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "Invalid email or password",
      data: [],
    });
  }

  const comparePassword = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    return res.status(400).json({
      status: false,
      message: "Invalid email or password",
      data: [],
    });
  }

   let payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  let token = jwt.sign({ id: user.id, email: user.email, name: user.named }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  payload.token = token;

  return res.status(200).json({
    status: true,
    message: "Login successful",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};

//Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).json({ error: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
    tls:{
      rejectUnauthorized: false,
    }
  });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
  });

  return res.json({ message: "Password reset email sent" });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user)
    return res.status(400).json({ error: "Invalid or expired token" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpires = null;
  await user.save();

  return res.json({ message: "Password has been reset successfully" });
};

export const userProfile = async (req, res) => {
  return res.status(200).json({
    status: true,
    message: "User profile retrieved successfully",
    data: req.user,
  });
};
