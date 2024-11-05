import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkDbConnection } from "./config/db.js";
import webRouter from "./router/web.js";

dotenv.config(); // Get the environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
(async () => {
    try {
        await checkDbConnection();
        console.log('Database connected to PostgreSQL');
    } catch (error) {
        console.error('Connection to the database failed at: ', error.message);
        process.exit(1);
    }
})();

// Routes
app.use('/', webRouter);

// 404 Not Found handler
app.use((req, res) => {  // Correct order: (req, res)
    res.status(404).json({ // Correct usage of status
        success: false,
        error: "Route not found, return back"
    });
});

// Error handling middleware
app.use((err, req, res, next) => { // Correct order: (err, req, res, next)
    console.error('Internal application / Server error: ', err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Internal server error"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server has started successfully at port: ${PORT}`);
});

export default app; // For testing purposes