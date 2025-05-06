import { Request, Response } from 'express';


export const getUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  res.send(`User ID requested: ${userId}`);
};