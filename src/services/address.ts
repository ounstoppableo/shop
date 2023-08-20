import type { getAddressRes, addAddressForm } from './types/address'
import type { Data } from '@/utils/http'
import http from '@/utils/http'
//获取收货地址列表
export const getAddress = (): Promise<Data<getAddressRes[]>> => {
  return http<getAddressRes[]>({
    url: '/member/address',
    method: 'GET',
  })
}
//新建、添加收货地址
export const updateAddress = (data: addAddressForm) => {
  if (data.id) {
    return http({
      url: `/member/address/${data.id}`,
      method: 'PUT',
      data,
    })
  } else {
    return http({
      url: '/member/address',
      method: 'POST',
      data,
    })
  }
}
//通过id获取收获地址
export const getAddressById = (id: string): Promise<Data<getAddressRes[]>> => {
  return http<getAddressRes[]>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}
//删除地址
export const delAddressById = (id: string) => {
  return http<{ id: string }>({
    url: `/member/address/${id}`,
    method: 'DELETE',
  })
}
