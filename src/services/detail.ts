import http from '@/utils/http'
import type { Data } from '@/utils/http'
import type { detailResult } from './types/detail'
export const getGood = (id: string): Promise<Data<detailResult>> => {
  return http<detailResult>({
    url: `/goods?id=${id}`,
  })
}
