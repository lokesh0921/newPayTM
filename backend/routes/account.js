const express = require("express");
const { route } = require("./user");
const { User, Account } = require("../models/user.model");
const { authMiddleware } = require("../middleware");
const router = express.Router();
const mongoose = require("mongoose");

//   ++++++++++++++
// i think i need to fix userId: in both routes and handle that somehow throung frontend

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  console.log("account bal :", account.balance);

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;

  try {
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      console.log("Account not found or insufficient balance");
      return res
        .status(400)
        .json({ message: "Account not found or insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      console.log("Receiver's account not found/ Invalid account");
      return res.status(400).json({ message: "Invalid receiver account" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();
    res.json({ message: "Transfer successfull" });
  } catch (error) {
    console.log(
      "Transaction failed. Internal server error in transfer route: ",
      error.message
    );
    res.status(500).json({
      message: "Transaction failed. Internal server error in transfer route",
    });
  }
});

module.exports = router;

// i think i need to fix userId: in both routes and handle that somehow throung frontend
