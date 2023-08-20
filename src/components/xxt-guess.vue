<script setup lang="ts">
import { onMounted } from 'vue'
import { getGuess } from '@/services/home'
import { ref } from 'vue'
import type { guess, guessItem } from '@/services/types/home'
const guessData = ref<guess>({
  counts: 0,
  pageSize: 10,
  pages: 0,
  page: 1,
  items: [],
})
//数据加载完信号
const hasComplete = ref(false)
//获取数据
const getGuessData = async () => {
  if (!hasComplete.value) {
    const res = await getGuess(guessData.value.page, guessData.value.pageSize)
    ;(res.result as guess).items.forEach((item: guessItem) => guessData.value.items.push(item))
    if ((res.result as guess).pages > guessData.value.page) {
      guessData.value.page++
    } else {
      hasComplete.value = true
    }
  }
}
const resetAll = () => {
  guessData.value = {
    counts: 0,
    pageSize: 10,
    pages: 0,
    page: 1,
    items: [],
  }
  hasComplete.value = false
}
onMounted(() => {
  getGuessData()
})
defineExpose({ getGuessData, resetAll })
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessData.items"
      :key="item.id"
      :url="`/pages/detail/detail?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name">
        {{ item.name }}
      </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text"> {{ hasComplete ? '已经没有内容了' : '正在加载...' }} </view>
</template>

<style lang="scss">
:host {
  display: block;
}

/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;

  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }

  .image {
    width: 304rpx;
    height: 304rpx;
  }

  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }

  .small {
    font-size: 80%;
  }
}

// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
