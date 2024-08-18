import { Request, Response } from 'express';

const welcome = async (req: Request, res: Response): Promise<void> => {
  res.json({
    status: 200,
    message: 'Welcome to timble-app API!'
  });
}

export default {
  welcome,
}