<script lang="ts" setup>
import loginBg from '~/assets/images/login/login-bg.png'
import { useLogin, useRegister } from './composable'

// 默认是登录操作，可以切换为注册，此值设置为false
const isLogin = ref(true)

// 登录
const login_account = ref('')
const login_password = ref('')

// 注册
const register_account = ref('')
const register_password = ref('')
const register_password_confirm = ref('')
// 切换登录注册
const changeStatus = () => {
  isLogin.value = !isLogin.value
}

const { registerLoading, registerConfirm } = useRegister(register_account, register_password, register_password_confirm, () => {})
const { loginLoading, loginConfirm } = useLogin(login_account, login_password, () => {})
</script>

<template>
  <div class="w-screen h-screen overflow-hidden flex flex-col justify-center items-center" :style="{ backgroundImage: `url(${loginBg})` }">
    <div v-if="isLogin" class="login-box">
      <div class="login-title">登录</div>
      <el-input v-model="login_account" placeholder="手机号/邮箱" />
      <el-input v-model="login_password" type="password" placeholder="密码" show-password />
      <div class="register-tip" @click="changeStatus">还没有账号？去注册</div>
      <el-button class="w-full" type="primary" :loading="loginLoading" @click="loginConfirm">登录</el-button>
    </div>
    <div v-else class="login-box">
      <div class="login-title">注册</div>
      <el-input v-model="register_account" placeholder="手机号/邮箱" />
      <el-input v-model="register_password" type="password" placeholder="密码" show-password />
      <el-input v-model="register_password_confirm" type="password" placeholder="密码确认" show-password />
      <div class="register-tip" @click="changeStatus">已经有账号了？去登录</div>
      <el-button class="w-full" type="primary" :loading="registerLoading" @click="registerConfirm">注册</el-button>
    </div>
  </div>
</template>

<route lang="yaml">
name: user-login
</route>

<style lang="scss" scoped>
.login-box {
  width: 400px;
  height: 600px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 32px;

  .login-title {
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
    align-self: self-start;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 20px;
  }
}

.register-tip {
  color: #999;
  font-size: 12px;
  line-height: 18px;
  align-self: flex-end;
}
</style>
