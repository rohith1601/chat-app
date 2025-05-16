import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import messaageRoutes from './routes/message.route.js';
import {connectDB} from './lib/db.js';


dotenv.config();

const app = express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messaageRoutes);


app.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
  connectDB();
});

