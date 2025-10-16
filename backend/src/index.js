import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express'
import fileUpload from "express-fileupload";
import path from "path";




import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stat.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json());

app.use(clerkMiddleware());//this will add auth to req object => req.auth
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// Start server
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    connectDB();
});
