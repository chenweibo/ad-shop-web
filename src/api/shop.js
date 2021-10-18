import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/shop/list',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/shop/create',
    method: 'post',
    data
  })
}

export function shop(query) {
  return request({
    url: '/shop/getShopInfo',
    method: 'get',
    params: query
  })
}

export function update(id, data) {
  return request({
    url: '/shop/update/' + id,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/shop/delete/' + id,
    method: 'delete'
  })
}
