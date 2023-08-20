import type { goods, goodsItem } from './global'
//banner部分result
export interface bannerResultItem {
  id: string
  imgUrl: string
  hrefUrl: string
  type: number
}
//分类部分
export interface category {
  id: string
  name: string
  icon: string
}
//热门推荐
export interface hot {
  id: string
  alt: string
  pictures: string[]
  target: string
  title: string
  type: string
}
//猜你喜欢
export interface guess extends goods {
  items: guessItem[]
}
export type guessItem = goodsItem
