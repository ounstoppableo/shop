<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './CustomNavbar.vue'
import type {
  bannerResultItem,
  category as categoryDetial,
  hot as hotDetail,
} from '@/services/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBanner, getCategory, getHot } from '@/services/home'
import category from './category.vue'
import hot from './hot.vue'
import skeleton from './skeleton.vue'
//轮播图的数据
const swipperData = ref<bannerResultItem[]>([])
//首页分类的数据
const categoryData = ref<categoryDetial[]>([])
//热门推荐的数据
const hotData = ref<hotDetail[]>([])
//获取guessRef
const guessRef = ref()
//判断是否在加载
const loading = ref(true)
//获取banner的数据
const getHomeBannerData = async () => {
  const res = await getHomeBanner()
  swipperData.value = res.result as bannerResultItem[]
}
//获取首页分类数据
const getCategoruData = async () => {
  const res = await getCategory()
  categoryData.value = res.result as categoryDetial[]
}
//获取热门
const getHotData = async () => {
  const res = await getHot()
  hotData.value = res.result as hotDetail[]
}
//scroll触底事件
function scollToBottom() {
  guessRef.value.getGuessData()
}
//下拉刷新回调
const refreshFlag = ref(false)
async function refresh() {
  refreshFlag.value = true
  loading.value = true
  guessRef.value.resetAll()
  await Promise.all([
    getHomeBannerData(),
    getCategoruData(),
    getHotData(),
    guessRef.value.getGuessData(),
  ])
  refreshFlag.value = false
  loading.value = false
}
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getCategoruData(), getHotData()])
  loading.value = false
})
</script>

<template>
  <skeleton v-if="loading"></skeleton>
  <view v-if="!loading" style="height: 100%; display: flex; flex-direction: column">
    <CustomNavbar></CustomNavbar>
    <scroll-view
      scroll-y
      style="flex: 1"
      @scrolltolower="scollToBottom"
      refresher-enabled
      @refresherrefresh="refresh"
      :refresher-triggered="refreshFlag"
    >
      <xxt-swipper :list="swipperData"></xxt-swipper>
      <category :list="categoryData"></category>
      <hot :list="hotData"></hot>
      <xxt-guess ref="guessRef"></xxt-guess>
    </scroll-view>
  </view>
</template>
<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
}
</style>
