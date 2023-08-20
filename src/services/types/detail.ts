export interface detailResult {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  brand: brand
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: string[]
  videoScale: number
  mainPictures: string[]
  specs: specsItem[]
  skus: skuItem[]
  categories: categoriesItem[]
  details: details
  isPreSale: true
  isCollect: null
  recommends: null
  userAddresses: null
  evaluationInfo: null
  similarProducts: similarProductsItem[]
  hotByDay: hotByDayItem[]
}
export interface brand {
  id: string
  name: string
  nameEn: string
  picture: string
  logo: string
  type: null
  desc: null
  place: null
}
export interface specsItem {
  id: string
  name: string
  values: specsItemValuesItem[]
}
export interface specsItemValuesItem {
  name: string
  picture: string
  available: boolean
  desc: string
}
export interface skuItem {
  id: string
  skuCode: string
  price: string
  oldPrice: string
  inventory: number
  picture: string
  specs: skuItemSpecsItem[]
}
export interface skuItemSpecsItem {
  name: string
  valueName: string
}
export interface categoriesItem {
  id: string
  name: string
  layer: number
  parent: {
    id: string
    name: string
    layer: 0
    parent: null
  }
}
export interface details {
  properties: propertiesItem[]
  pictures: string[]
}
export interface propertiesItem {
  name: string
  value: string
}
export interface similarProductsItem {
  id: string
  picture: string
  name: string
  price: string
  desc: string
  orderNum: number
  discount: null
}
export interface hotByDayItem {
  id: string
  picture: string
  name: string
  price: string
  desc: string
  orderNum: number
  discount: null
}
