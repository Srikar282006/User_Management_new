const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes.js");
const dataRoutes = require("./routes/data.routes.js");

dotenv.config();

const app = express();

app.use(express.json()); // 🔹 Move this before defining routes
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));

// Correct route prefixes
app.use("/api", userRoutes);
app.use("/api/users", dataRoutes); // ✅ Route is correctly mounted

mongoose
    .connect("mongodb://localhost:27017/userdisplay", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
