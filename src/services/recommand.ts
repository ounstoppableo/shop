import http from '@/utils/http'
import type { recommandResult } from './types/recommand'
import type { Data } from '@/utils/http'
export const getRecommand = (
  type: string | number,
  page: number,
  subType?: string,
): Promise<Data<recommandResult>> => {
  if (type == 1) {
    return http<recommandResult>({
      url: `/hot/preference?page=${page}&pageSize${10}${subType ? `&subType=${subType}` : ''}`,
    })
  } else if (type == 2) {
    return http<recommandResult>({
      url: `/hot/inVogue?page=${page}&pageSize${10}${subType ? `&subType=${subType}` : ''}`,
    })
  } else if (type == 3) {
    return http<recommandResult>({
      url: `/hot/oneStop?page=${page}&pageSize${10}${subType ? `&subType=${subType}` : ''}`,
    })
  } else {
    return http<recommandResult>({
      url: `/hot/new?page=${page}&pageSize${10}${subType ? `&subType=${subType}` : ''}`,
    })
  }
}
