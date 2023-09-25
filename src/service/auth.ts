import { baseRequest } from '~/core/request'

/* 注册接口 */
export const userRegister = async (
  email: string,
  password: string
) => {
  return await baseRequest.post('/user/signup', { email, password }) as { user_id: string, token: string }
}

/* 登录接口 */
export const userLogin = async (
  email: string, // 用户名
  password: string
) => {
  return await baseRequest.post('/user/login', { email, password }) as { user_id: string, token: string }
}