// Imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import journeyRoutes from "./routes/journeys.js";
import authRoutes from "./routes/auth.js";
import { isAuthenticated } from "./middleware/auth.js";

// Configurations
const app = express();  
dotenv.config();
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}));

// Routes
app.use("/auth", authRoutes)
app.use("/journeys", isAuthenticated, journeyRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack, err.name, err.code);
    res.status(500).json({
        errorMessage: "Something went wrong. Try later."
    })
});

// Database setup
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connection has been established");
        const PORT = process.env.PORT || 6000;
        app.listen(PORT,  () => {
        console.log("App is listening on PORT", PORT)
    });
}).catch(err => {
    console.log("Database connection failed: ", err)
})
