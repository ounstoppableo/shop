import http from '@/utils/http'
import type { loginForm, loginRes, editForm } from './types/login'
import type { Data } from '@/utils/http'
export const login = (data: loginForm): Promise<Data<loginRes>> => {
  return http<loginRes>({
    url: '/login/wxMin',
    method: 'POST',
    data,
  })
}
export const loginSimulation = (phone: string): Promise<Data<loginRes>> => {
  return http<loginRes>({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber: phone,
    },
  })
}
export const getInfo = (): Promise<Data<editForm>> => {
  return http<editForm>({
    url: '/member/profile',
    method: 'GET',
  })
}
export const editInfo = (data: editForm): Promise<Data<editForm>> => {
  return http<editForm>({
    url: '/member/profile',
    method: 'PUT',
    data,
  })
}
export const editAvatar = (file: string) => {
  return uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath: file,
  })
}
