import User from '../db/models/user.model';
import { LoginRequest } from '../requests/user.request'
import { generateUuid, hashPassword } from '../utils/general.util'

const getUserByUsername = async (username: string) => {
  return await User.findOne({ where: { username } })
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

export default {
  getUserByUsername,
  create,
}