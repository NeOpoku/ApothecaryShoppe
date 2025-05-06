import express from 'express';

const app = express();
const router = express.Router();

// Middleware (optional)
app.use(express.json());

// Route
router.get('/status', (_req: express.Request, res: express.Response) => {
  res.send('API is running');
});

// Mount router
app.use('/api', router); // The route becomes /api/status

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});