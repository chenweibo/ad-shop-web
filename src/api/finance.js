import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/finance/list',
    method: 'get',
    params: query
  })
}
