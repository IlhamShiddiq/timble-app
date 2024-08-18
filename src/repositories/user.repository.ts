import { Op, literal } from 'sequelize';
import { sql } from '@sequelize/core';
import User from '../db/models/user.model';
import { LoginRequest } from '../requests/user.request';
import { generateUuid, hashPassword } from '../utils/general.util';

const getUserById = async (id: string) => {
  return await User.findOne({ where: { id } })
}

const getUserByUsername = async (username: string) => {
  return await User.findOne({ where: { username } })
}

const getRandomMatch = async (id: string, gender: string) => {
  return await User.findOne(
    {
      where: {
        id: {
          [Op.not]: id,
          [Op.notIn]: sql`
            SELECT DISTINCT target_user_id
              FROM user_swipes
              WHERE user_id = ${id}
                AND created_at::date = CURRENT_DATE
          `,
        },
        gender: {
          [Op.not]: gender,
        }
      },
      order: literal(('RANDOM()'))
    }
  )
}

const create = async (payload: LoginRequest) => {
  return await User.create({
    id: generateUuid(),
    name: payload.name,
    username: payload.username,
    password: await hashPassword(payload.password),
    gender: payload.gender,
    is_premium: false
  })
}

const setPremiumById = async (id: string) => {
  return await User.update(
    { is_premium: true },
    {
      where: {
        id
      }
    }
  )
}

export default {
  getUserById,
  getUserByUsername,
  getRandomMatch,
  create,
  setPremiumById,
}