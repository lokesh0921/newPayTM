const express = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://admin:adminkapassword2024@cluster0.7di3t.mongodb.net/"
    );
    console.log("Mongo DB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error ", error);
  }
};

module.exports = { connectDB };
