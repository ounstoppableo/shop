// /src/pages/hot/hot.vue
<script setup lang="ts">
import { getRecommand } from '@/services/recommand'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { recommandResult } from '@/services/types/recommand'
import type { goodsItems } from '@/services/types/recommand'
import skeleton from './skeleton.vue'
import { nextTick } from 'vue'
const query = defineProps(['type'])
const page = ref<number>(import.meta.env.DEV ? 30 : 1)
//判断是否加载完毕
const loading = ref<boolean>(true)
//用于存储数据
const recommandData = ref<recommandResult>()
//用于存储底部商品的数据
const goodsItem = ref<goodsItems>()
//用于控制tab栏高亮
const tab = ref<string>()
//切换后的回调
const switchTab = (id: any) => {
  tab.value = id
  goodsItem.value = recommandData.value?.subTypes.find((item) => item.id === id)!.goodsItems
}
//获取数据的函数
const getRecommandData = async () => {
  const res = await getRecommand(query.type, page.value)
  recommandData.value = res.result as recommandResult
  tab.value = recommandData.value.subTypes[0].id
  goodsItem.value = recommandData.value.subTypes[0].goodsItems
}
//页面加载的回调
onLoad(async () => {
  await getRecommandData()
  loading.value = false
})
//滚动触底的回调
const scrolltolower = async () => {
  if (goodsItem.value!.page < goodsItem.value!.pages) {
    const res = await getRecommand(query.type, ++goodsItem.value!.page, tab.value)
    const goodsData = (res.result as recommandResult).subTypes.find(
      (item) => item.id === tab.value,
    )?.goodsItems
    goodsItem.value?.items.push(...goodsData!.items)
  } else {
    goodsItem.value!.finally = true
  }
}
//监听滚动事件
const scroll = (ev: UniHelper.ScrollViewOnScrollEvent) => {
  goodsItem.value!.scrollTop = ev.detail.scrollTop
}
</script>

<template>
  <skeleton v-if="loading"></skeleton>
  <view v-if="!loading" class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="recommandData?.bannerPicture"> </image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        class="text"
        :class="{ active: tab === item.id }"
        v-for="item in recommandData?.subTypes"
        :key="item.id"
        @tap="switchTab(item.id)"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      @scroll="scroll"
      scroll-y
      class="scroll-view"
      @scrolltolower="scrolltolower"
      :scroll-top="goodsItem!.scrollTop"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          :url="`/pages/detail/detail?id=${good.id}`"
          v-for="good in goodsItem?.items"
          :key="good.id"
        >
          <image class="thumb" :src="good.picture"></image>
          <view class="name ellipsis">{{ good.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ good.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ goodsItem?.finally ? '已经加载完了' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}

.scroll-view {
  flex: 1;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;

  .text {
    margin: 0 20rpx;
    position: relative;
  }

  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;

  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    height: 88rpx;
    font-size: 26rpx;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .symbol {
    font-size: 70%;
  }

  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
