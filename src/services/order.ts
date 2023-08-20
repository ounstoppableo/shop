import http, { type Data } from '@/utils/http'
import type {
  orderDetail,
  preOrder as preOrderRes,
  submitOrderForm,
  submitOrderRes,
  orderListRes,
  logisticsRes,
} from './types/order'
//获取预付订单
export const preOrder = (): Promise<Data<preOrderRes>> => {
  return http<preOrderRes>({
    url: '/member/order/pre',
    method: 'GET',
  })
}
//获取立即购买订单
export const buyNowOrder = (skuId: string, count: string, addressId: string) => {
  return http({
    url: '/member/order/pre/now',
    method: 'GET',
    data: {
      skuId,
      count,
      addressId,
    },
  })
}
//获取再次购买订单
export const buyAgain = (id: string) => {
  return http({
    url: `/member/order/repurchase/${id}`,
    method: 'GET',
  })
}
//提交订单
export const submitOrder = (data: submitOrderForm): Promise<Data<submitOrderRes>> => {
  return http<submitOrderRes>({
    url: '/member/order',
    method: 'POST',
    data,
  })
}
//获取订单详情
export const getDetail = (id: string): Promise<Data<orderDetail>> => {
  return http<orderDetail>({
    url: `/member/order/${id}`,
    method: 'GET',
  })
}
//删除订单
export const delOrder = (ids: string[]) => {
  return http({
    url: '/member/order',
    method: 'DELETE',
    data: { ids },
  })
}
//取消订单
export const cancelOrder = (id: string, cancelReason: string) => {
  return http({
    url: `/member/order/${id}/cancel`,
    method: 'PUT',
    data: {
      cancelReason,
    },
  })
}
//获取支付信息
export const pay = (orderId: string) => {
  return http({
    url: `/pay/wxPay/miniPay?orderId=${orderId}`,
    method: 'GET',
  })
}
//模拟支付
export const payMock = (orderId: string) => {
  return http({
    url: `/pay/mock?orderId=${orderId}`,
    method: 'GET',
  })
}
//模拟发货
export const mockDeliver = (id: string) => {
  return http({
    url: `/member/order/consignment/${id}`,
  })
}
//确认收获
export const confirmReceive = (id: string) => {
  return http({
    url: `/member/order/${id}/receipt`,
    method: 'PUT',
  })
}
//获取订单列表
export const orderList = (page: number, orderState?: number): Promise<Data<orderListRes>> => {
  return http({
    url: `/member/order?page=${page}&pageSize=5&orderState=${orderState}`,
  })
}
//获取订单物流
export const logistics = (id: string): Promise<Data<logisticsRes>> => {
  return http<logisticsRes>({
    url: `/member/order/${id}/logistics`,
  })
}
