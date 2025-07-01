const express = require("express");
const { connectDB } = require("./util/db");
const mainRouter = require("./routes/index"); //check here if route is correct
const cors = require("cors");

const port = 5001;
const app = express();

app.use(cors());
app.use(express.json());

//Router

app.use("/api/v1", mainRouter);

// not neeeded
app.listen(port, () => {
  console.log(`server running on port ${port}`);
  connectDB();
});
