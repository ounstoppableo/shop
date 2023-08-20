import http from '@/utils/http'
import type { bannerResultItem, category, hot, guess } from './types/home'
import type { Data } from '@/utils/http'
//获取首页banner
export const getHomeBanner = (): Promise<Data<bannerResultItem>> => {
  return http<bannerResultItem>({
    url: '/home/banner',
    method: 'GET',
  })
}
//获取首页分类
export const getCategory = (): Promise<Data<category>> => {
  return http<category>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}
//获取热门
export const getHot = (): Promise<Data<hot>> => {
  return http<hot>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}
//猜你喜欢
export const getGuess = (page: number, pageSize: number): Promise<Data<guess>> => {
  return http<guess>({
    url: `/home/goods/guessLike?page=${page}&pageSize=${pageSize}`,
    method: 'GET',
  })
}
