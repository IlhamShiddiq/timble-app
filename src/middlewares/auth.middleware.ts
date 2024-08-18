import { Response, NextFunction } from 'express';
import { UserAuthRequest } from '../requests/general.request'

import jwt from 'jsonwebtoken'
import configs from '../configs/general.config'

interface JwtPayload {
  id: string;
}

const verifyToken = (req: UserAuthRequest, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('Authorization')

  if (!token) {
    return res.status(403).json({
      status: 403,
      message: 'A token is required for authentication',
    })
  }

  try {
    const decoded: JwtPayload = jwt.verify(token.split(' ')[1], configs.app.jwt_secret) as JwtPayload
    req.user = decoded.id
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid token or token already expired',
    })
  }

  return next()
}

export default {
  verifyToken,
}