import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import userRouter from './routes/authRoutes.js';
import articleRouter from './routes/articleRoutes.js';

dotenv.config();
connectDB();

// Drop old 'email' index if it exists
User.collection.indexExists("email_1").then((exists) => {
  if (exists) {
    User.collection.dropIndex("email_1")
      .then(() => console.log("Dropped old email index."))
      .catch(err => console.error("Failed to drop email index:", err));
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is up and running"));
app.use('/auth', userRouter);
app.use('/articles', articleRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
