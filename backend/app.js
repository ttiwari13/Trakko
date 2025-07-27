const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes= require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',authRoutes);
app.use('/api/profile',userRoutes);
// Routes
app.get("/", (req, res) => {
  res.send("🚀 Trakko is live");
});

module.exports = app;
