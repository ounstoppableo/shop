<script setup lang="ts">
import { getCart, delCart, editSingleCart, selectAll } from '@/services/cart'
import type { getCartRes } from '@/services/types/cart'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useMemberStore } from '@/stores/modules/member'
import { computed } from 'vue'

const userData = useMemberStore()
//
const cartData = ref<getCartRes[]>([] as getCartRes[])
//合计
const total = computed(() => {
  return cartData.value
    .reduce((pre, curr) => (curr.selected ? pre + curr.count * curr.price : pre + 0), 0)
    .toFixed(2)
})
//获取购物车数据
const getCartData = async () => {
  const res = await getCart()
  cartData.value = (res.result as getCartRes[]) || []
}

//数量变化
const numberChange = (obj: any) => {
  cartData.value[obj.index].count = obj.value
  editSingleCart(cartData.value[obj.index])
}
//是否选中
const select = (index: number) => {
  cartData.value[index].selected = !cartData.value[index].selected
  editSingleCart(cartData.value[index])
}
//全选按钮数据
const allSelect = computed({
  get() {
    return cartData.value.filter((item) => item.selected === true).length === cartData.value.length
  },
  set(value) {
    cartData.value.forEach((item) => (item.selected = value))
    selectAll(value)
  },
})
//全选按钮回调
const allcheck = () => {
  allSelect.value = !allSelect.value
}
//删除
const onDeleteCart = (skuid: string) => {
  uni.showModal({
    content: '是否删除',
    success: async (res) => {
      if (res.confirm) {
        // 后端删除单品
        await delCart([skuid])
        // 重新获取列表
        getCartData()
      }
    },
  })
}
//去结算回调
const toPay = () => {
  const selectedItems = cartData.value.filter((item) => item.selected === true)
  uni.navigateTo({ url: `/subpages/order/order?type=cart` })
}
onShow(() => {
  getCartData()
})
</script>

<template>
  <scroll-view scroll-y class="scroll-view">
    <!-- 已登录: 显示购物车 -->
    <template v-if="userData.profile?.id">
      <!-- 购物车列表 -->
      <view class="cart-list" v-if="cartData.length">
        <!-- 优惠提示 -->
        <view class="tips">
          <text class="label">满减</text>
          <text class="desc">满1件, 即可享受9折优惠</text>
        </view>
        <!-- 滑动操作分区 -->
        <uni-swipe-action>
          <!-- 滑动操作项 -->
          <uni-swipe-action-item
            v-for="(item, index) in cartData"
            :key="item.skuId"
            class="cart-swipe"
          >
            <!-- 商品信息 -->
            <view class="goods">
              <!-- 选中状态 -->
              <text
                class="checkbox"
                :class="{ checked: item.selected }"
                @tap="select(index)"
              ></text>
              <navigator
                :url="`/pages/detail/detail?id=${item.id}`"
                hover-class="none"
                class="navigator"
              >
                <image mode="aspectFill" class="picture" :src="item.picture"></image>
                <view class="meta">
                  <view class="name ellipsis">{{ item.name }}</view>
                  <view class="attrsText ellipsis">{{ item.attrsText }}</view>
                  <view class="price">{{ item.price }}</view>
                </view>
              </navigator>
              <!-- 商品数量 -->
              <view class="count">
                <vk-data-input-number-box
                  v-model="item.count"
                  :min="1"
                  :max="item.stock"
                  :step="1"
                  :step-strictly="true"
                  :positive-integer="true"
                  :index="index"
                  @change="numberChange"
                ></vk-data-input-number-box>
              </view>
            </view>
            <!-- 右侧删除按钮 -->
            <template #right>
              <view class="cart-swipe-right">
                <button @tap="onDeleteCart(item.skuId)" class="button delete-button">删除</button>
              </view>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <!-- 购物车空状态 -->
      <view class="cart-blank" v-else>
        <image src="/static/images/blank_cart.png" class="image" />
        <text class="text">购物车还是空的，快来挑选好货吧</text>
        <navigator hover-class="none" url="/pages/index/index" open-type="switchTab">
          <button class="button">去首页看看</button>
        </navigator>
      </view>
      <!-- 吸底工具栏 -->
      <view class="toolbar">
        <text class="all" :class="{ checked: allSelect }" @tap="allcheck">全选</text>
        <text class="text">合计:</text>
        <text class="amount">{{ total }}</text>
        <view class="button-grounp">
          <view
            class="button payment-button"
            @tap="toPay"
            :class="{
              disabled: cartData.filter((item) => item.selected === true).length ? false : true,
            }"
          >
            去结算({{
              cartData.reduce((pre, curr) => (curr.selected ? pre + curr.count : pre + 0), 0)
            }})
          </view>
        </view>
      </view>
    </template>
    <!-- 未登录: 提示登录 -->
    <view class="login-blank" v-else>
      <text class="text">登录后可查看购物车中的商品</text>
      <navigator url="/pages/login/login" hover-class="none">
        <button class="button">去登录</button>
      </navigator>
    </view>
    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef"></XtxGuess>
    <!-- 底部占位空盒子 -->
    <view class="toolbar-height"></view>
  </scroll-view>
</template>

<style lang="scss">
// 根元素
:host {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f8;
}

// 滚动容器
.scroll-view {
  flex: 1;
}

// 购物车列表
.cart-list {
  padding: 0 20rpx;

  // 优惠提示
  .tips {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 30rpx 10rpx;
    font-size: 26rpx;
    color: #666;

    .label {
      color: #fff;
      padding: 7rpx 15rpx 5rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
      background-color: #27ba9b;
      margin-right: 10rpx;
    }
  }

  // 购物车商品
  .goods {
    display: flex;
    padding: 20rpx 20rpx 20rpx 80rpx;
    border-radius: 10rpx;
    background-color: #fff;
    position: relative;

    .navigator {
      display: flex;
    }

    .checkbox {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 100%;

      &::before {
        content: '\e6cd';
        font-family: 'erabbit' !important;
        font-size: 40rpx;
        color: #444;
      }

      &.checked::before {
        content: '\e6cc';
        color: #27ba9b;
      }
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
    }

    .name {
      height: 72rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrsText {
      line-height: 1.8;
      padding: 0 15rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .price {
      line-height: 1;
      font-size: 26rpx;
      color: #444;
      margin-bottom: 2rpx;
      color: #cf4444;

      &::before {
        content: '￥';
        font-size: 80%;
      }
    }

    // 商品数量
    .count {
      position: absolute;
      bottom: 20rpx;
      right: 5rpx;

      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 220rpx;
      height: 48rpx;

      .text {
        height: 100%;
        padding: 0 20rpx;
        font-size: 32rpx;
        color: #444;
      }

      .input {
        height: 100%;
        text-align: center;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #444;
        background-color: #f6f6f6;
      }
    }
  }

  .cart-swipe {
    display: block;
    margin: 20rpx 0;
  }

  .cart-swipe-right {
    display: flex;
    height: 100%;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      padding: 6px;
      line-height: 1.5;
      color: #fff;
      font-size: 26rpx;
      border-radius: 0;
    }

    .delete-button {
      background-color: #cf4444;
    }
  }
}

// 空状态
.cart-blank,
.login-blank {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;

  .image {
    width: 400rpx;
    height: 281rpx;
  }

  .text {
    color: #444;
    font-size: 26rpx;
    margin: 20rpx 0;
  }

  .button {
    width: 240rpx !important;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    font-size: 26rpx;
    border-radius: 60rpx;
    color: #fff;
    background-color: #27ba9b;
  }
}

// 吸底工具栏
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;

  .all {
    margin-left: 25rpx;
    font-size: 14px;
    color: #444;
    display: flex;
    align-items: center;
  }

  .all::before {
    font-family: 'erabbit' !important;
    content: '\e6cd';
    font-size: 40rpx;
    margin-right: 8rpx;
  }

  .checked::before {
    content: '\e6cc';
    color: #27ba9b;
  }

  .text {
    margin-right: 8rpx;
    margin-left: 32rpx;
    color: #444;
    font-size: 14px;
  }

  .amount {
    font-size: 20px;
    color: #cf4444;

    .decimal {
      font-size: 12px;
    }

    &::before {
      content: '￥';
      font-size: 12px;
    }
  }

  .button-grounp {
    position: absolute;
    right: 10rpx;
    top: 50%;

    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 72rpx;
    font-size: 13px;
    color: #fff;
    transform: translateY(-50%);

    .button {
      width: 240rpx;
      margin: 0 10rpx;
      border-radius: 72rpx;
    }

    .payment-button {
      background-color: #27ba9b;

      &.disabled {
        opacity: 0.6;
      }
    }
  }
}

// 底部占位空盒子
.toolbar-height {
  height: 100rpx;
  box-sizing: content-box;
}
</style>
