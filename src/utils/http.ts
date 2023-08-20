import { useMemberStore } from '@/stores/index'
export interface Data<T> {
  code: string
  message: string
  result: Array<T> | T
}
const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const httpReqOptions = {
  //拦截器
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) options.url = baseUrl + options.url
    //超时控制
    options.timeout = 10000
    //设置响应头
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    const useMember = useMemberStore()
    if (useMember.profile?.token) options.header.Authorization = useMember.profile?.token
  },
}
uni.addInterceptor('request', httpReqOptions)
uni.addInterceptor('uploadFile', httpReqOptions)
export default <T>(options: UniApp.RequestOptions): Promise<Data<T>> => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      //成功的回调
      success(res: any) {
        const useMember = useMemberStore()
        if (res.statusCode >= 200 && res.statusCode <= 300) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          useMember.clearProfile()
          uni.showToast({ title: 'token过期,请重新登录' })
          uni.navigateTo({ url: '/pages/login/login' })
          resolve(res.data)
        } else {
          uni.showToast({ title: '请求失败', icon: 'error' })
          reject(res.data)
        }
      },
      //失败的回调
      fail(res: any) {
        uni.showToast({ title: '网络错误', icon: 'error' })
        reject(res.data)
      },
    })
  })
}
