import request from '@/utils/request'
const Qs = require('qs')

const url = 'i'

// 输入成语
export function checkIdiom(data) {
  return request({
    url: url + '/checkIdiom',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 提示
export function tips() {
  return request({
    url: url + '/tips',
    method: 'post'
  })
}
