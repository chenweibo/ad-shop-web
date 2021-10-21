import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/task/create',
    method: 'post',
    data
  })
}
