import { literal } from 'sequelize';
import UserSwipe from '../db/models/user.swipe.model';
import { UserSwipeCreateRequest } from '../requests/user.request'
import { generateUuid } from '../utils/general.util';

const create = async (payload: UserSwipeCreateRequest) => {
  return await UserSwipe.create({
    id: generateUuid(),
    user_id: payload.user_id,
    target_user_id: payload.target_user_id,
    swipe_direction: payload.swipe_direction,
  })
}

const countRandomMatchLimit = async (id: string) => {
  return await UserSwipe.count({
    where: {
      user_id: id,
      created_at: literal('created_at::date = CURRENT_DATE')
    }
  })
}

export default {
  create,
  countRandomMatchLimit,
}