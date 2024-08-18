import { Request, Response } from 'express';

const welcome = async (req: Request, res: Response): Promise<void> => {
  res.send('Welcome to timble-app API!');
}

export default {
  welcome,
}