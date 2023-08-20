import http, { type Data } from '@/utils/http'
import type { getCartRes } from './types/cart'
export const getCart = (): Promise<Data<getCartRes>> => {
  return http<getCartRes>({
    url: '/member/cart',
    method: 'GET',
  })
}
export const addCart = (skuId: string, count: number) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}
export const delCart = (ids: string[]) => {
  return http({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids,
    },
  })
}
//修改购物车单品
export const editSingleCart = (data: getCartRes) => {
  return http({
    url: `/member/cart/${data.skuId}`,
    method: 'PUT',
    data,
  })
}
//全选
export const selectAll = (selected: boolean) => {
  return http({
    url: `/member/cart/selected`,
    method: 'PUT',
    data: {
      selected,
    },
  })
}
