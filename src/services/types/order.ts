import type { getAddressRes } from './address'
import type { getCartRes } from './cart'

export interface preOrder {
  userAddresses: getAddressRes[]
  goods: getCartRes[]
  summary: {
    goodsCount: number
    totalPrice: number
    totalPayPrice: number
    postFee: number
    discountPrice: number
  }
}
//提交订单
export interface submitOrderForm {
  goods: { skuId: string; count: number }[]
  addressId: string
  deliveryTimeType: number
  buyerMessage: string
  payType: number
  payChannel: number
}
export interface submitOrderRes {
  id: string
}
/** 订单状态枚举 */
export enum OrderState {
  /** 待付款 */
  DaiFuKuan = 1,
  /** 待发货 */
  DaiFaHuo = 2,
  /** 待收货 */
  DaiShouHuo = 3,
  /** 待评价 */
  DaiPingJia = 4,
  /** 已完成 */
  YiWanCheng = 5,
  /** 已取消 */
  YiQuXiao = 6,
}
/** 订单状态列表 */
export const orderStateList = [
  { id: 0, text: '' },
  { id: 1, text: '待付款' },
  { id: 2, text: '待发货' },
  { id: 3, text: '待收货' },
  { id: 4, text: '待评价' },
  { id: 5, text: '已完成' },
  { id: 6, text: '已取消' },
]
//订单详情
export interface orderDetail {
  id: string
  createTime: string
  payType: number
  orderState: number
  payLatestTime: string
  countdown: number
  postFee: string
  payMoney: string
  payChannel: number
  totalMoney: string
  totalNum: string
  deliveryTimeType: number
  receiverContact: string
  receiverMobile: string
  receiverAddress: string
  payTime: string
  consignTime: string
  arrivalEstimatedTime: string
  endTime: string
  closeTime: string
  evaluationTime: string
  skus: skusItem[]
}
export interface skusItem {
  id: string
  spuId: string
  attrsText: string
  name: string
  quantity: string
  image: string
  totalMoney: number
  realPay: number
  curPrice: number
  properties: {
    propertyMainName: string
    propertyValueName: string
  }[]
}
export interface orderListRes {
  counts: number
  pageSize: string
  pages: string
  page: string
  items: orderDetail[]
}
export interface logisticsRes {
  picture: string
  count: number
  company: {
    name: string
    number: string
    tel: string
  }
  list: [
    {
      id: string
      text: string
      time: string
    },
  ]
}
