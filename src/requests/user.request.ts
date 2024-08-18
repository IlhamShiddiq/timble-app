export interface LoginRequest {
  username: string
  password: string
  name: string
  gender: string
}

export interface UserSwipeCreateRequest {
  user_id: string
  target_user_id: string
  swipe_direction: string
}