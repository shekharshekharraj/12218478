const express = require("express");
require("dotenv").config();
const app = express();

const { connect } = require("./config/database");
const logger = require("./Middlewares/Urlshortner");
const routes = require("./Routes/Urlroutes");

app.use(express.json());
app.use(logger);
app.use("/", routes);

connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
