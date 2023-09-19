import type { Ref } from 'vue'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()

export function useLogin(
  bind_account: Ref<string>,
  password: Ref<string>,
  opType: Ref<string>,
  cb: () => void
) {
  const loading = ref(false)
  async function confirm() {
    if (loading.value) {
      return
    }
    if (!bind_account.value) {
      // 非0开头的11位手机号
      $toast('请输入用户名')
      return
    }
    if (!password.value) {
      $toast('请输入密码')
      return
    }

    const confirmLogin = async function () {
      try {
        loading.value = true
        const { user_info } = await loginByMobile(
          aesEncrypt(mobile.value),
          vcode.value,
          vcodeToken.value,
          opType.value,
          userStore.open_id
        )
        if (user_info) {
          if (user_info.bind_mobile === userStore.bind_mobile) {
            $toast('切换的账号当前已登录')
          }
          userStore.performLogin(user_info)
          /* 清空LocalStorage */
          localStorage.clear()
          cb()
        } else {
          $toast('登录失败，请联系客服')
        }
        loading.value = false
      } catch (e) {
        loading.value = false
      }
    }
  }
  return { loading, confirm }
}

