import { Response } from 'express';
import { UserSwipeCreateRequest } from '../requests/user.request';
import { UserAuthRequest } from '../requests/general.request';

import UserModel from '../db/models/user.model';
import UserRepository from '../repositories/user.repository';
import UserSwipeRepository from '../repositories/user.swipe.repository';
import userRepository from '../repositories/user.repository';

const getRandomMatch = async (req: UserAuthRequest, res: Response): Promise<Response> => {
  const payload: UserSwipeCreateRequest = req.body as UserSwipeCreateRequest;
  payload.user_id = req.user || ''

  const user: UserModel | null = await UserRepository.getUserById(payload.user_id)
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    })
  }

  const userSwipeCount: number = await UserSwipeRepository.countRandomMatchLimit(payload.user_id)
  if (!user.is_premium && userSwipeCount >= 10) {
    return res.status(400).json({
      status: 400,
      message: 'Your swipe limit has been reached',
    })
  }

  const targetUser: UserModel | null = await UserRepository.getRandomMatch(payload.user_id, user.gender)

  return res.json({
    status: 200,
    message: 'Get random match',
    data: targetUser ? {
      id: targetUser?.id,
      name: targetUser?.name,
      gender: targetUser?.gender,
    } : null
  })
}

const randomMatchAction = async (req: UserAuthRequest, res: Response): Promise<Response> => {
  const payload: UserSwipeCreateRequest = req.body as UserSwipeCreateRequest;
  payload.user_id = req.user || ''

  const user: UserModel | null = await UserRepository.getUserById(payload.user_id)
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    })
  }

  const userSwipeCount: number = await UserSwipeRepository.countRandomMatchLimit(payload.user_id)
  if (!user.is_premium && userSwipeCount >= 10) {
    return res.status(400).json({
      status: 400,
      message: 'Your swipe limit has been reached',
    })
  }

  await UserSwipeRepository.create(payload)

  return res.json({
    status: 201,
    message: 'Action stored',
  })
}

const purchasePremium = async (req: UserAuthRequest, res: Response): Promise<Response> => {
  const user_id: string = req.user || ''
  await userRepository.setPremiumById(user_id)

  return res.json({
    status: 200,
    message: 'Premium purchased',
  })
}

export default {
  getRandomMatch,
  randomMatchAction,
  purchasePremium,
}