import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRouter from './controllers/aiController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Define allowed origins
const allowedOrigins = [
  'https://budget-genie.vercel.app/', // TODO: Replace with your actual Vercel URL
  'http://localhost:5173'
];

// --- Middleware ---
// Enable CORS for your frontend
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());


// --- Routes ---
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
