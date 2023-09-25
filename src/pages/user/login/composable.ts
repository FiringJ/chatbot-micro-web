import type { Ref } from 'vue'
import { useUserStore } from '~/store/user'
import { userRegister, userLogin } from '~/service/auth'


const userStore = useUserStore()

export function useRegister(
  register_account: Ref<string>,
  register_password: Ref<string>,
  register_password_confirm: Ref<string>,
  cb: () => void
) {
  const loading = ref(false)
  async function registerConfirm() {
    // 防抖
    if (loading.value) {
      return
    }
    // 表单校验
    if (!register_account.value) {
      ElMessage('请输入用户名')
      return
    }
    if (!register_password.value || !register_password_confirm.value) {
      ElMessage('请输入密码')
      return
    }
    if (register_password.value !== register_password_confirm.value) {
      ElMessage('两次输入的密码不一致，请检查后重新输入')
      return
    }
    // 请求注册
    try {
      loading.value = true
      const user_info = await userRegister(
        register_account.value,
        register_password.value
      )
      if (user_info) {
        userStore.performLogin(user_info)
        /* 清空LocalStorage */
        localStorage.clear()
        cb()
      } else {
        ElMessage('登录失败，请联系客服')
      }
      loading.value = false
    } catch (e) {
      loading.value = false
    }
  }
  return { registerLoading: loading, registerConfirm }
}

export function useLogin(
  login_account: Ref<string>,
  login_password: Ref<string>,
  cb: () => void
) {
  const loading = ref(false)
  async function loginConfirm() {
    // 防抖
    if (loading.value) {
      return
    }
    // 表单校验
    if (!login_account.value) {
      ElMessage('请输入用户名')
      return
    }
    if (!login_password.value) {
      ElMessage('请输入密码')
      return
    }
    // 请求登录
    try {
      loading.value = true
      const user_info = await userLogin(
        login_account.value,
        login_password.value
      )
      if (user_info) {
        if (user_info.user_id === userStore.user_id) {
          ElMessage('切换的账号当前已登录')
        }
        userStore.performLogin(user_info)
        /* 清空LocalStorage */
        localStorage.clear()
        cb()
      } else {
        ElMessage('登录失败，请联系客服')
      }
      loading.value = false
    } catch (e) {
      loading.value = false
    }
  }
  return { loginLoading: loading, loginConfirm }
}

