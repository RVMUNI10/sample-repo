// server/index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const promptRoutes = require("./routes/promptRoutes"); // Import routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", promptRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server is live at http://localhost:${PORT}`);
});
