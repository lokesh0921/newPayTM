// const express = require("express");
// const { connectDB } = require("./util/db");
// const mainRouter = require("./routes/index"); //check here if route is correct
// const cors = require("cors");
// const path = require("path");
// dotenv.config();

// const port = 5001;
// const app = express();

// const __dirname = path.resolve();
// app.use(cors());
// app.use(express.json());

// //Router

// app.use("/api/v1", mainRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "./frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./frontend", "dist", "index.html"));
//   });
// }
// // not neeeded
// app.listen(port, () => {
//   console.log(`server running on port ${port}`);
//   connectDB();
// });

const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { connectDB } = require("./util/db");
const mainRouter = require("./routes/index");

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", mainRouter);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const __dirnameResolved = path.resolve(); // Use a renamed var to avoid conflict
  app.use(express.static(path.join(__dirnameResolved, "./frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirnameResolved, "./frontend", "dist", "index.html")
    );
  });
}

// Start server
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await connectDB();
});
