const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const formData = require("express-form-data");

const app = express();
const bodyParser = require("body-parser");

//connect db
connectDB();

//init middleware
app.use(express.json());

app.use(formData.parse());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define  Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

module.exports = app.listen(PORT, () => console.log("server is start"));
