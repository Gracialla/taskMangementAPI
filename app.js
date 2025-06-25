import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

import { sequelize } from "./config/db.config.js";
import path from 'path';


dotenv.config();



const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);



import nodemailer from "nodemailer";

const testTransporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

app.get("/test-email", async (req, res) => {
  try {
    await testTransporter.sendMail({
      from: `"Task Management Support" <${process.env.EMAIL_FROM}>`,
      to: "jimmymangara20@gmail.com",
      subject: "Test Email from Task Management",
      html: `<p>This is a test email from your Mailtrap SMTP setup</p>`,
    });

    res.status(200).json({ message: "Test email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
});


sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port: ", PORT);
    });
  })
  .catch((err) => {
    console.log("Error syncing database: ", err);
  });
