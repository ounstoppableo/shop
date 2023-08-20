export interface loginForm {
  code: string
  encryptedData: string
  iv: string
}
export interface loginRes {
  id: string
  mobile?: string
  token?: string
  nickname: string
  avatar: string
  account: string
}
export interface editForm extends loginRes {
  gender?: string
  birthday?: string | null
  fullLocation?: string
  profession?: string
  provinceCode?: string
  cityCode?: string
  countyCode?: string
}
