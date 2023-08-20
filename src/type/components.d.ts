import XxtSwipper from '@/components/xxt-swipper.vue'
import XxtGuess from '@/components/xxt-guess.vue'
import vkDataGoodsSkuPopup from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue'
import vkDataInputNumberBox from '@/components/vk-data-goods-sku-popup/vk-data-input-number-box.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XxtSwipper: typeof XxtSwipper
    XxtGuess: typeof XxtGuess
    vkDataGoodsSkuPopup: typeof vkDataGoodsSkuPopup
    vkDataInputNumberBox: typeof vkDataInputNumberBox
  }
}
export type guessInstence = InstanceType<typeof XxtGuess>
