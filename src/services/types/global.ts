export interface goods {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: goodsItem[]
}
export interface goodsItem {
  id: string
  name: string
  desc: string
  price: number
  picture: string
  discount?: number
  orderNum?: number
}
