import type { goodsItem } from './global'
export interface categoryResult {
  id: string
  name: string
  picture: string
  imageBanners: string[]
  children: childrenItem[]
}
export interface childrenItem {
  id: string
  name: string
  picture: string
  parentId: null
  parentName: null
  goods: goodsItem[]
  categories: null
  brands: null
  saleProperties: null
}
