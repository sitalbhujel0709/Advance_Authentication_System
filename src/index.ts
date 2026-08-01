import app from "./app";
import connectToDB from "./config/database";
import redisClient from "./config/redis";
import "./queue/emailQueue"; // Initialize the email worker

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToDB();
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    console.log("Redis connected successfully");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
