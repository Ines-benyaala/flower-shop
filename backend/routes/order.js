const express = require("express");
const axios = require("axios");
const Order = require("../models/Order");
require("dotenv").config();

const router = express.Router();

// Helper function to send confirmation email
async function sendConfirmationEmail(fullname, message, email) {
  try {
    const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } =
      process.env;

    // Check if required EmailJS configuration values are set
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
      throw new Error("EmailJS configuration missing");
    }

    const emailData = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_USER_ID,
      template_params: {
        to_name: fullname, // Adjust the values as necessary
        from_name: "bloom",
        message: message,
        reply_to: email, // Use dynamic data if needed
      },
    };

    console.log("Sending request to EmailJS with data:", emailData);

    // Send the email request to EmailJS using axios
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      emailData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("EmailJS response status:", response.status);
    console.log("EmailJS response data:", response.data);

    // Check if the response status is 200 (success)
    if (response.status !== 200) {
      console.log("Failed to send email");
      throw new Error("Email send failed");
    }
  } catch (error) {
    // Catch any error and log it
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    alert(
      "Email sending failed: " +
        (error.response ? error.response.data : error.message)
    );
  }
}

// Define the POST route for placing an order
router.post("/place-order", async (req, res) => {
  console.log("Received a place order request");

  try {
    const { fullname, email, phone, products } = req.body;

    // Validate input
    if (!fullname || !email || !phone || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Calculate total price
    const totalAmount = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    // Save the order in the database
    const newOrder = new Order({
      fullname,
      email,
      phone,
      products,
      totalAmount,
    });

    const message = `Your order has been created successfully with total amount: ${totalAmount} dt`;
    await newOrder.save();

    // Send confirmation email
    try {
      await sendConfirmationEmail(fullname, message, email);
      console.log("Email sent successfully");
      return res.status(200).json({
        message: "Order placed successfully, confirmation email sent",
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
      return res
        .status(500)
        .json({ message: "Order placed but email sending failed" });
    }
  } catch (error) {
    console.error("Error while processing order:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
