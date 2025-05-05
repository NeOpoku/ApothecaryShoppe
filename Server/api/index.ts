import express from 'express';
const router = express.Router();

router.get('/status', (req: express.Request, res: express.Response) => {
  res.send('API is running');
});



