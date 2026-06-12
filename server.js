const dotenv = require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { connect } = require("mongoose");
const connectdb = require("./config/dbConnection");

connectdb();
const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
