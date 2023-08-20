export interface getAddressRes {
  id?: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  fullLocation: string
  address: string
  isDefault: number
  flag?: boolean
}
export interface addAddressForm extends getAddressRes {}
