const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Incorrect inputs/ Email already taken",
    });
  }

  const user = await User.findOne({
    username: body.username,
  });

  if (user) {
    // not n eedded to have user._id can use just user
    return res.json({ message: "Email already taken/ Incorrect inputs" });
  }

  const dbUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const userId = dbUser._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 1000,
  });

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

//  sign in route

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);

  if (!success) {
    return res.send({ message: "Incorrect/invalid inputs" });
  }

  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (!user) {
    return res.status(401).send({ message: "Incorrect username or password" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.json({
    token: token,
  });
  authMiddleware();
});

// update schema

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

// update route

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);

  if (!success) {
    return res.status(401).json({ message: "Incorrect/invalid inputs" });
  }

  try {
    const result = await User.updateOne({ _id: req.userId }, body);

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Error while updating information:", error);
    res.status(500).json({ message: "Error while updating information" });
  }
});

// get bulk route

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstname: { $regex: filter, $options: "i" },
      },
      {
        lastname: { $regex: filter, $options: "i" },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
