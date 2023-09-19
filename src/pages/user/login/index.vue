<script lang="ts" setup>
// 默认是登录操作，可以切换为注册，此值设置为false
const isLogin = ref(false)
const bind_account = ref('')
const password = ref('')
const passwordConfirm = ref('')
const handleLogin = () => {}
</script>

<template>
  <div v-if="isLogin">
    <div>登录</div>
    <el-input v-model="bind_account" placeholder="请输入用户名" />
    <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
    <el-button type="primary" @click="handleLogin">登录</el-button>
  </div>
  <div v-else>
    <div>注册</div>
    <el-input v-model="bind_account" placeholder="请输入用户名" />
    <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
    <el-input v-model="passwordConfirm" type="password" placeholder="二次确认密码" show-password />
    <el-button type="primary" @click="handleLogin">注册</el-button>
  </div>
</template>

<route lang="yaml">
name: user-login
</route>

<style lang="scss" scoped></style>
