<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { orderList, confirmReceive, payMock, pay, delOrder } from '@/services/order'
import type { orderListRes, orderDetail } from '@/services/types/order'
import { orderStateList, OrderState } from '@/services/types/order'
import { onShow } from '@dcloudio/uni-app'
import { watch } from 'vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const query = defineProps(['type'])
// tabs 数据
const orderTabs = ref([
  { orderState: 0, title: '全部' },
  { orderState: 1, title: '待付款' },
  { orderState: 2, title: '待发货' },
  { orderState: 3, title: '待收货' },
  { orderState: 4, title: '待评价' },
])
const type = ref(query.type)
const page = ref<number>(1)
const isbottom = ref<boolean>(false)
const getOrderList = async () => {
  if (!isbottom.value) {
    const res = await orderList(page.value, type.value)
    orderListForState.value.push(...(res.result as orderListRes).items)
    if (page.value < +(res.result as orderListRes).pages) {
      page.value++
    } else {
      isbottom.value = true
    }
  }
}
const orderListForState = ref<orderDetail[]>([])
onShow(() => {
  getOrderList()
})
//重新渲染列表
const resetList = () => {
  orderListForState.value = []
  page.value = 1
  isbottom.value = false
  getOrderList()
}
watch(type, () => {
  resetList()
})
const swiperChange = (ev: UniHelper.SwiperOnChangeEvent) => {
  type.value = ev.detail.current
}
const switchTab = (index: number) => {
  type.value = index
}
//确认收货
const confirmReceiv = async (state: number, id: string) => {
  if (state > OrderState.DaiFaHuo) {
    const res = await confirmReceive(id)
    if (res.code === '1') {
      getOrderList()
      uni.showToast({ title: '确认成功', icon: 'success' })
    }
  } else {
    uni.showToast({ title: '别急哦,商家还没发货呢~', icon: 'none' })
  }
}
//划到底部
const scrolltolower = async () => {
  await getOrderList()
}
//去支付的回调
const toPay = async (id: string) => {
  if (import.meta.env.DEV) {
    const res = await payMock(id)
  } else {
    const res = await pay(id)
    await wx.requestPayment(res.result as any)
  }
  orderListForState.value = []
  page.value = 1
  isbottom.value = false
  getOrderList()
}
//下拉刷新
const refresherTriggered = ref<boolean>(false)
const refresherrefresh = async () => {
  await resetList()
  refresherTriggered.value = true
  nextTick(() => {
    refresherTriggered.value = false
  })
}
//删除订单的回调
const toDelOrder = (id: string) => {
  uni.showModal({
    title: '您确定要删除该订单吗?',
    success: async (success) => {
      if (success.confirm) {
        const res = await delOrder([id])
        if (res.code === '1') {
          await resetList()
          uni.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    },
  })
}
</script>

<template>
  <view class="viewport">
    <!-- tabs -->
    <view class="tabs">
      <text
        class="item"
        v-for="(item, index) in orderTabs"
        :key="item.orderState"
        @tap="switchTab(index)"
      >
        {{ item.title }}
      </text>
      <!-- 游标 -->
      <view class="cursor" :style="{ left: type * 20 + '%' }"></view>
    </view>
    <!-- 滑动容器 -->
    <swiper class="swiper" @change="swiperChange">
      <!-- 滑动项 -->
      <swiper-item v-for="item in orderTabs" :key="item.orderState">
        <!-- 订单列表 -->
        <scroll-view
          scroll-y
          class="orders"
          @scrolltolower="scrolltolower"
          refresher-enabled
          :refresher-triggered="refresherTriggered"
          @refresherrefresh="refresherrefresh"
        >
          <view class="card" v-for="order in orderListForState" :key="order.id">
            <!-- 订单信息 -->
            <view class="status">
              <text class="date">{{ order.createTime }}</text>
              <!-- 订单状态文字 -->
              <text>{{ orderStateList[order.orderState].text }}</text>
              <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
              <text class="icon-delete" @tap="toDelOrder(order.id)"></text>
            </view>
            <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
            <navigator
              v-for="sku in order.skus"
              :key="sku.id"
              class="goods"
              :url="`/pages/detail/detail?id=${sku.spuId}`"
              hover-class="none"
            >
              <view class="cover">
                <image mode="aspectFit" :src="sku.image"> </image>
              </view>
              <view class="meta">
                <view class="name ellipsis">{{ sku.name }}</view>
                <view class="type">{{ sku.attrsText }}</view>
              </view>
            </navigator>
            <!-- 支付信息 -->
            <view class="payment">
              <text class="quantity">共{{ order.totalNum }}件商品</text>
              <text>实付</text>
              <text class="amount"> <text class="symbol">¥</text>{{ order.payMoney }}</text>
            </view>
            <!-- 订单操作按钮 -->
            <view class="action">
              <!-- 待付款状态：显示去支付按钮 -->
              <template v-if="order.orderState === OrderState.DaiFuKuan">
                <view class="button primary" @tap="toPay(order.id)">去支付</view>
              </template>
              <template v-else>
                <navigator
                  class="button secondary"
                  :url="`/subpages/order/order?type=buyAgain&id=${order.id}`"
                  hover-class="none"
                >
                  再次购买
                </navigator>
                <!-- 待收货状态: 展示确认收货 -->
                <view
                  v-if="order.orderState < OrderState.DaiPingJia"
                  class="button primary"
                  @tap="confirmReceiv(order.orderState, order.id)"
                  >确认收货
                </view>
              </template>
            </view>
          </view>
          <!-- 底部提示文字 -->
          <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
            {{ isbottom ? '没有更多数据~' : '正在加载...' }}
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

// tabs
.tabs {
  display: flex;
  justify-content: space-around;
  line-height: 60rpx;
  margin: 0 10rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  position: relative;
  z-index: 9;

  .item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-size: 28rpx;
    color: #262626;
  }

  .cursor {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20%;
    height: 6rpx;
    padding: 0 50rpx;
    background-color: #27ba9b;
    /* 过渡效果 */
    transition: all 0.4s;
  }
}

// swiper
.swiper {
  background-color: #f7f7f8;
}

// 订单列表
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;

    .date {
      color: #666;
      flex: 1;
    }

    .primary {
      color: #ff9240;
    }

    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }

  .goods {
    display: flex;
    margin-bottom: 20rpx;

    .cover {
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1;
      padding: 6rpx 4rpx 6rpx 8rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx 0 0 0;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }

  .payment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    padding: 20rpx 0;
    text-align: right;
    color: #999;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;

    .quantity {
      font-size: 24rpx;
      margin-right: 16rpx;
    }

    .amount {
      color: #444;
      margin-left: 6rpx;
    }

    .symbol {
      font-size: 20rpx;
    }
  }

  .action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20rpx;

    .button {
      width: 180rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20rpx;
      border-radius: 60rpx;
      border: 1rpx solid #ccc;
      font-size: 26rpx;
      color: #444;
    }

    .secondary {
      color: #27ba9b;
      border-color: #27ba9b;
    }

    .primary {
      color: #fff;
      background-color: #27ba9b;
    }
  }

  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
