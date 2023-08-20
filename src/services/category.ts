import http from '@/utils/http'
import type { categoryResult } from './types/category'
import type { Data } from '@/utils/http'
export const getCategory = (): Promise<Data<categoryResult[]>> => {
  return http<categoryResult[]>({
    url: '/category/top',
  })
}
