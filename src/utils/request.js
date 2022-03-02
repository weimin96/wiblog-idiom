/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'

export const getBaseUrl = () => {
  return process.env.VUE_APP_HOST
}

// create an axios instance
const service = axios.create({
  baseURL: getBaseUrl(),
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 200000 // request timeout
})
service.interceptors.request.use(
  config => {
    // do something before request is sent
    NProgress.start()
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    NProgress.done()
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      if (res.code === 400) {
        Message.error(res.msg)
        return res
      }
      return Promise.reject(new Error(res.msg || '服务器异常！'))
    } else {
      // Message.success(res.msg)
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
