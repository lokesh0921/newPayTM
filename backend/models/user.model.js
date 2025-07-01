const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstname: {
    required: true,
    type: String,
    trim: true,
    maxLength: 30,
  },
  lastname: {
    required: true,
    type: String,
    trim: true,
    maxLength: 30,
  },
  password: {
    required: true,
    type: String,
    minLength: 6,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("PaytmUser", userSchema);
const Account = mongoose.model("PaytmAccount", accountSchema);

module.exports = { User, Account };
