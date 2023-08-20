import type { goods } from './global'
export interface recommandResult {
  title: string
  id: string
  bannerPicture: string
  subTypes: [
    {
      id: string
      title: string
      goodsItems: goodsItems
    },
  ]
}
export interface goodsItems extends goods {
  finally?: boolean
  scrollTop?: number
}
