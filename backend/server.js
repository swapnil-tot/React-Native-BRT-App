const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const corsOption = {
  credentials: true,
  origin: true,
};
connectDb();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors(corsOption));
app.use(express.json());

app.use("/api/BRT", require("./routes/routes"));
app.use("/api/", require("./routes/advertisementRoute"));

// Serve the assetlinks.json file statically
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

app.use(errorHandler);
app.listen(port, () => {
  console.log("listing", port);
});
