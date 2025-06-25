import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});


export const sendEmail = async ({ to, subject, text }) => {
  try {
    if (!to) {
      throw new Error("Email recipient ('to') is missing!");
    }

    console.log("Preparing to send email:");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Text:", text);

    const emailData = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(emailData);
    console.log("Email sent:", info.messageId || info.response);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};