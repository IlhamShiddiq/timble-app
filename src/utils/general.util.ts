import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../configs/general.config';

const generateUuid = (): string => {
  return crypto.randomUUID().toString()
}

const generateJwt = (data: object): string => {
  return jwt.sign(data, configs.app.jwt_secret)
}

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt
    .genSalt(8)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return hash
    })
}

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
}

export {
  generateUuid,
  generateJwt,
  hashPassword,
  comparePassword,
}