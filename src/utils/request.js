import axios from 'axios'

const service = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/308752/xsTableView/test',
  timeout: 30000
})
service.interceptors.request.use(
  config => {
    return config
  }
)
service.interceptors.response.use(
  res => {
    if (res.status === 200 && res.data.code === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data.message)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export const testApi = params => service({ method: 'get', params })

