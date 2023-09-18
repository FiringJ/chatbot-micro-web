<script lang="ts" setup>
  const router = useRouter()
  const route = useRoute()
  const opType = useRouteQuery('op_type', 'bind')

  /* 登录成功后，页面重定向 */
  const redirect = function () {}
</script>

<template>
  <div class="view">
    <login-panel @login-success="redirect" />
  </div>
</template>

<route lang="yaml">
name: login
</route>

<style lang="scss" scoped>
  .view {
    @apply h-[100vh] relative;
  }
</style>
