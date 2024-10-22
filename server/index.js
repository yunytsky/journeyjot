// Imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Configurations
const app = express();  
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}));

// Routes
// app.use("/auth", fooRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack, err.name, err.code);
    res.status(500).json({
        errorMessage: "Something went wrong. Try later."
    })
});

// Database setup
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Database connection has been established");
        const PORT = process.env.PORT || 6000;
        app.listen(PORT,  () => {
        console.log("App is listening on PORT", PORT)
    });
}).catch(err => {
    console.log("Database connection failed: ", err)
})
