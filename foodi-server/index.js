const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Mongodb config using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-cluster.c9d435w.mongodb.net/foodi-client?retryWrites=true&w=majority&appName=foodi-cluster`
  )
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.log("Error connecting to DB", error));

// Import routes
const menuRoutes = require('./api/routes/menuRoutes')
const cartRoutes = require('./api/routes/cartRoutes')
const userRoutes = require('./api/routes/userRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
