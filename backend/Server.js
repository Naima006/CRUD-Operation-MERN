const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/TaskRoute");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

// Routes
app.use("/api", routes);

// Fallback Route for Undefined Routes
app.get("/", (req, res) => {
    res.send("Welcome to the CRUD API!");
});

// Handle Undefined API Routes
app.use((req, res) => {
    res.status(404).send("Route not found.");
});

// Start Server
app.listen(PORT, () => console.log(`Listening at ${PORT}`));
