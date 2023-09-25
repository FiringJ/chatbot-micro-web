import axios from 'axios'
import type { AxiosHeaders, AxiosRequestConfig } from 'axios'
import * as _ from 'lodash-es'
import { useUserStore } from '~/store/user'

declare module 'axios' {
  interface AxiosRequestConfig {
    getToken?: () => string | undefined
    errorHandler?: (ret: number) => boolean | undefined
  }
}

const hasChinese = (str: string) => /[\u4E00-\u9FA5]/.test(str)

const errHandler = (ret: number, err: string, errorHandler: AxiosRequestConfig['errorHandler']) => {
  let hasHandled = false
  if (errorHandler) {
    hasHandled = !!errorHandler(ret)
  }
  if (!hasHandled) {
    switch (ret) {
      case 101:
        ElMessage.error('参数错误')
        hasHandled = true
        break
      case 105:
        ElMessage.error('登录状态已过期，请刷新重试')
        hasHandled = true
        break
    }
  }
  if (!hasHandled && hasChinese(err)) {
    ElMessage.error(err)
    hasHandled = true
  }
  return hasHandled
}

/* https://www.axios-http.cn/docs/instance */
export const createApiInstance = (baseURL: string) => {
  const requestConfig = {
    baseURL,
    timeout: 30000,
    headers: {}
  }
  const api = axios.create(requestConfig)

  api.interceptors.request.use(
    config => {
      if (!config.headers) {
        config.headers = {} as AxiosHeaders
      }

      const userStore = useUserStore()
      if (userStore.token) {
        config.params = { ...config.params, token: userStore.token }
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  api.interceptors.response.use(
    response => {
      const ret = +_.get(response, 'data.ret', 0)
      if (ret === 0) {
        return response.data.data || response.data
      } else if (!errHandler(ret, response.data.err, response.config.errorHandler)) {
        ElMessage.error('未知错误')
        return Promise.reject(response.data)
      } else {
        return Promise.reject(response.data)
      }
    },
    error => {
      const err = {
        status: _.get(error, 'response.status', 500),
        ret: _.get(error, 'response.data.ret', ''),
        message:
          (error.response && error.response.data && error.response.data.err) ||
          error.message ||
          '未知错误',
        stack: error.stack || ''
      }
      if (error.message === 'Network Error') {
        err.message = '网络是不是断了？<br />请检查网络连接是否正常'
      }
      if (!errHandler(+err.ret || +err.status, err.message, error.config.errorHandler)) {
        ElMessage.error(err.message)
      }
      return Promise.reject(error)
    }
  )

  return api
}

export const baseRequest = createApiInstance('https://101.34.10.3')
