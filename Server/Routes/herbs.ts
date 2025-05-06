import { Router, Request, Response } from 'express';
import Herb from '../Models/herb';

const router = Router();


router.get('/', async (_req: Request, res: Response) => {
  const herbs = await Herb.find();
  res.json(herbs);
});


router.get('/:id', async (req: Request, res: Response) => {
  const herb = await Herb.findById(req.params.id);
  res.json(herb);
});


router.post('/', async (req: Request, res: Response) => {
  const herb = new Herb(req.body);
  await herb.save();
  res.status(201).json(herb);
});


router.put('/:id', async (req: Request, res: Response) => {
  const updated = await Herb.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});


router.delete('/:id', async (req: Request, res: Response) => {
  await Herb.findByIdAndDelete(req.params.id);
  res.json({ message: 'Herb deleted' });
});

export default router;