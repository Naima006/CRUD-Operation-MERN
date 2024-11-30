const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/TaskRoute");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: [
        "https://crud-operation-mern-frontend.vercel.app"
    ],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Welcome to the CRUD API!");
});

app.use((req, res) => {
    res.status(404).send("Route not found.");
});

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
module.exports = app;
