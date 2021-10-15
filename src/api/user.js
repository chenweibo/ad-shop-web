import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sso/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sso/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/sso/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/sso/register',
    method: 'post',
    data
  })
}
