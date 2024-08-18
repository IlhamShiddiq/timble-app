import { Request, Response } from 'express';
import { LoginRequest } from '../requests/user.request'
import { generateJwt, comparePassword } from '../utils/general.util'

import UserRepository from '../repositories/user.repository'

const signUp = async (req: Request, res: Response): Promise<Response> => {
  const payload: LoginRequest = req.body as LoginRequest
  const newUser = await UserRepository.create(payload)

  return res.json({
    status: 200,
    message: 'Sign up successful!',
    data: {
      token: generateJwt({ id: newUser.id }),
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
      }
    },
  })
}

const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body
  const user = await UserRepository.getUserByUsername(username)
  if (!user) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid username or password',
    })
  }

  const isPasswordMatched = await comparePassword(password, user.password)
  if (!isPasswordMatched) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid username or password',
    })
  }

  return res.json({
    status: 200,
    message: 'Login successfully',
    data: {
      token: generateJwt({ id: user.id }),
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      }
    },
  })
}

export default {
  signUp,
  login
}