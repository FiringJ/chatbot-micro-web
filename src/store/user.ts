import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isAuth = ref(false)
  const user_id = ref('')
  const user_account = ref('')
  const token = useSessionStorage('access-token', '')

  function performLogin(res: {
    user_id: string,
    user_account: string,
    token: string
  }) {
    token.value = res.token
    user_account.value = res.user_account
    user_id.value = res.user_id
    isAuth.value = true
  }

  return {
    isAuth,
    user_id,
    user_account,
    token,
    performLogin
  }
})