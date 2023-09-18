<script lang="ts" setup>
  import * as _ from 'lodash-es'
  import { $toast } from '~/core/ui-service'

  const prop = defineProps({
    fromPage: {
      type: String,
      default: 'user-login'
    }
  })
  /* 返回登录成功的自定义事件 */
  const emits = defineEmits(['loginSuccess'])

  /* 手机号验证码登录 */
  const telephone = ref('') // 手机号
  const vcode = ref('') // 手机验证码
  const { countdownText, disabled, vcodeToken, onClick } = useCountDown(telephone, opType.value) // 验证码倒计时
  const clickWithDebounce = _.debounce(onClick, 300, {
    leading: true,
    trailing: false
  })
  const { loading, confirm } = useLogin(telephone, vcode, vcodeToken, checked, opType, () => {
    // 验证码登录
    checked.value = null
    emits('loginSuccess')
  })

  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const quickLogin = ref<HTMLElement>()
  const { height } = useElementSize(quickLogin)
  const loginArea = ref<HTMLElement>()
  const { height: loginAreaHeight } = useElementSize(loginArea)
  const quickLoginFixed = ref(true)
  const loginAreaFixed = ref(true)

  watch(height, val => {
    const outerHeight =
      prop.fromPage === 'card-share' ? 0.6 * windowHeight.value : windowHeight.value
    const needHeight = +(76 * (windowWidth.value / 375))
    if (outerHeight - val > needHeight) {
      // 可以固定在底部
      quickLoginFixed.value = true
    } else {
      // 只能相对定位
      quickLoginFixed.value = false
    }
  })
</script>

<template>
  <div>
    <!-- 登录文案 -->
    <div class="login-title-old">登录 / 绑定名片全能王</div>
    <div class="login-area">
      <!-- 手机号输入 -->
      <input
        v-model="telephone"
        type="tel"
        class="input-item"
        placeholder="输入手机号"
        maxlength="11"
      />
      <!-- 验证码输入 -->
      <div class="input-item vcode-field">
        <input
          v-model="vcode"
          type="text"
          placeholder="输入验证码"
          class="vcode-input"
          maxlength="6"
        />
        <div class="send-btn" :class="[disabled && 'disabled']" @click="clickWithDebounce">
          {{ countdownText }}
        </div>
      </div>
      <!-- 登录按钮 -->
      <div class="mt-[32px] w-full">
        <van-button type="primary" class="btn-primary" :loading="loading" @click="confirm">
          登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  /* 一键登录一级页面 */
  .brand-logo {
    /* CC-logo */
    @apply pt-[92px] flex flex-row justify-center items-center;
  }
  .login-title {
    /* 主标题 */
    @apply mt-[40px] text-xl text-center text-black font-medium;
  }
  .sub-title {
    /* 副标题 */
    @apply mt-[8px] text-sm text-center text-[#5f5f5f];
  }
  .quick-login {
    /* 一键登录按钮组 */
    @apply mt-[45px] mx-[48px];
  }
  .privacy-area-fixed {
    /* 协议组 */
    @apply fixed bottom-[16px] mx-[24px];
  }
  .privacy-area-relative {
    /* 协议组 */
    @apply relative mt-[16px] pb-[20px] mx-[24px];
  }
  .link-style {
    /* 协议 */
    @apply text-blue whitespace-nowrap;
  }

  /* 一键登录二级页面：使用其他手机号登录 */
  .login-title-2 {
    /* 主标题 */
    @apply mt-[40px] ml-[20px] text-xl text-black font-medium;
  }
  .login-area {
    /* 登录面板 */
    @apply mt-[24px] ml-[20px] mr-[20px] mb-[16px] flex flex-col items-center;
  }
  .input-item {
    /* 输入框：【手机号，验证码】 */
    @apply w-full h-[44px] border-[1px] border-[#e7e7e7] rounded-[8px] text-base placeholder-[#c8c9cc] pl-[16px] hover:border-blue;
    -webkit-appearance: none;
  }
  .vcode-field {
    /* 验证码输入框 */
    @apply w-full flex justify-between items-center mt-[12px] py-[10px] px-[16px];
  }
  .vcode-input {
    /* 验证码input */
    @apply placeholder-[#c8c9cc] flex-1;
  }
  .send-btn {
    /* 验证码发送按钮 */
    @apply text-blue border-none h-[22px] text-sm cursor-pointer;
  }
  .send-btn.disabled {
    /* 验证码发送按钮：禁用 */
    @apply text-[#999999] cursor-default;
  }
  .user-tip {
    /* 新用户提示 */
    @apply mt-[24px] w-full text-center text-gray text-xs;
  }
  .bottom-btn-fixed {
    /* 返回一级页面按钮 */
    @apply fixed bottom-[32px] text-center text-sm text-blue;
  }
  .bottom-btn-relative {
    /* 返回一级页面按钮 */
    @apply relative pt-[20px] pb-[32px] text-center text-sm text-blue;
  }

  /* 老版本用户登录页面 */
  .brand-logo-old {
    /* brand-logo */
    @apply pt-[16px] pl-[20px] flex flex-row justify-start items-center;
  }
  .login-title-old {
    /* 主标题 */
    @apply mt-[56px] ml-[20px] text-xl text-black font-medium;
  }
  .user-tip-old {
    /* 用户提示 */
    @apply w-full text-center text-gray text-xs;
  }

  /* 覆盖vant默认样式 */
  :deep(.van-checkbox__icon) {
    align-self: self-start;
    margin-top: 3px;
  }
  :deep(.van-hairline--top-bottom:after) {
    content: none;
  }
</style>
