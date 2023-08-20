<script setup lang="ts">
import { preOrder, submitOrder, buyNowOrder, buyAgain } from '@/services/order'
import type { getAddressRes } from '@/services/types/address'
import type { getCartRes } from '@/services/types/cart'
import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import type { preOrder as preOrderRes, submitOrderForm } from '@/services/types/order'
import type { submitOrderRes } from '@/services/types/order'
//判断是购物车购买\再次购买\立即购买
const query = defineProps(['type', 'skuId', 'count', 'addressId', 'id'])
const selectedItems = ref<getCartRes[]>([] as getCartRes[])
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 订单备注
const buyerMessage = ref('')
//默认地址
const defaultAddress = ref<getAddressRes | null>(null)
// 配送时间
const deliveryList = ref([
  { type: 1, text: '时间不限 (周一至周日)' },
  { type: 2, text: '工作日送 (周一至周五)' },
  { type: 3, text: '周末配送 (周六至周日)' },
])
//获取预付订单
const getPreOrder = async () => {
  let res = null
  if (query.type === 'cart') {
    res = await preOrder()
  } else if (query.type === 'buyNow') {
    res = await buyNowOrder(query.skuId, query.count, query.addressId)
  } else {
    res = await buyAgain(query.id)
  }
  selectedItems.value = (res.result as preOrderRes).goods
  total.value = (res.result as preOrderRes).summary.totalPrice
  postFee.value = (res.result as preOrderRes).summary.postFee
  defaultAddress.value =
    query.type === 'buyNow'
      ? (res.result as preOrderRes).userAddresses[0]
      : ((res.result as preOrderRes).userAddresses.find(
          (item) => item.isDefault === 1,
        ) as getAddressRes)
}
//商品总价
const total = ref<number>(0)
//运费
const postFee = ref<number>(0)
onShow(() => {
  getPreOrder()
})
// 当前配送时间下标
const activeIndex = ref(0)
// 当前配送时间
const activeDelivery = computed(() => deliveryList.value[activeIndex.value])
// 修改配送时间
const onChangeDelivery: UniHelper.SelectorPickerOnChange = (ev) => {
  activeIndex.value = ev.detail.value
}
//用于存储订单表单
const submitForm = ref<submitOrderForm>({} as submitOrderForm)
//提交订单的回调
const confirm = async () => {
  if (defaultAddress.value) {
    submitForm.value.addressId = defaultAddress.value.id as string
    submitForm.value.buyerMessage = buyerMessage.value
    submitForm.value.deliveryTimeType = activeIndex.value
    submitForm.value.payChannel = 2
    submitForm.value.payType = 1
    submitForm.value.goods = selectedItems.value.map((item) => {
      return {
        skuId: item.skuId,
        count: item.count,
      }
    })
    const res = await submitOrder(submitForm.value)
    if (res.code === '1') {
      uni.showToast({ title: '订单提交成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateTo({
          url: `/subpages/order/orderDetail?id=${(res.result as submitOrderRes).id}`,
        })
      }, 500)
    }
  }
}
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 收货地址 -->
    <navigator
      v-if="defaultAddress"
      class="shipment"
      hover-class="none"
      url="/subpages/address/address"
    >
      <view class="user"> {{ defaultAddress.receiver }} </view>
      <view class="address">
        {{ defaultAddress.fullLocation + ' ' + defaultAddress.address }}
      </view>
      <text class="icon icon-right"></text>
    </navigator>
    <navigator v-else class="shipment" hover-class="none" url="/subpages/address/address">
      <view class="address"> 请选择收货地址 </view>
      <text class="icon icon-right"></text>
    </navigator>

    <!-- 商品信息 -->
    <view class="goods">
      <navigator
        v-for="item in selectedItems"
        :key="item.id"
        :url="`/pages/goods/goods?id=1`"
        class="item"
        hover-class="none"
      >
        <image class="picture" :src="item.picture" />
        <view class="meta">
          <view class="name ellipsis"> {{ item.name }} </view>
          <view class="attrs">{{ item.attrsText }}</view>
          <view class="prices">
            <view class="pay-price symbol">{{ item.price }}</view>
            <view class="price symbol">{{ item.nowPrice }}</view>
          </view>
          <view class="count">x{{ item.count }}</view>
        </view>
      </navigator>
    </view>

    <!-- 配送及支付方式 -->
    <view class="related">
      <view class="item">
        <text class="text">配送时间</text>
        <picker :range="deliveryList" range-key="text" @change="onChangeDelivery">
          <view class="icon-fonts picker">{{ activeDelivery.text }}</view>
        </picker>
      </view>
      <view class="item">
        <text class="text">订单备注</text>
        <input
          class="input"
          :cursor-spacing="30"
          placeholder="选题，建议留言前先与商家沟通确认"
          v-model="buyerMessage"
        />
      </view>
    </view>

    <!-- 支付金额 -->
    <view class="settlement">
      <view class="item">
        <text class="text">商品总价: </text>
        <text class="number symbol">{{ total.toFixed(2) }}</text>
      </view>
      <view class="item">
        <text class="text">运费: </text>
        <text class="number symbol">{{ postFee }}</text>
      </view>
    </view>
  </scroll-view>

  <!-- 吸底工具栏 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="total-pay symbol">
      <text class="number">{{ (total + postFee).toFixed(2) }}</text>
    </view>
    <view class="button" :class="{ disabled: defaultAddress ? false : true }" @tap="confirm">
      提交订单
    </view>
  </view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.symbol::before {
  content: '¥';
  font-size: 80%;
  margin-right: 5rpx;
}

.shipment {
  margin: 20rpx;
  padding: 30rpx 30rpx 30rpx 84rpx;
  font-size: 26rpx;
  border-radius: 10rpx;
  background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png)
    20rpx center / 50rpx no-repeat #fff;
  position: relative;

  .icon {
    font-size: 36rpx;
    color: #333;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20rpx;
  }

  .user {
    color: #333;
    margin-bottom: 5rpx;
  }

  .address {
    color: #666;
  }
}

.goods {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    padding: 30rpx 0;
    border-top: 1rpx solid #eee;

    &:first-child {
      border-top: none;
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .attrs {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 6rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .prices {
      display: flex;
      align-items: baseline;
      margin-top: 6rpx;
      font-size: 28rpx;

      .pay-price {
        margin-right: 10rpx;
        color: #cf4444;
      }

      .price {
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
    }

    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 26rpx;
      color: #444;
    }
  }
}

.related {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .input {
    flex: 1;
    text-align: right;
    margin: 20rpx 0;
    padding-right: 20rpx;
    font-size: 26rpx;
    color: #999;
  }

  .item .text {
    width: 125rpx;
  }

  .picker {
    color: #666;
  }

  .picker::after {
    content: '\e6c2';
  }
}

/* 结算清单 */
.settlement {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    font-size: 26rpx;
    color: #333;
  }

  .danger {
    color: #cf4444;
  }
}

/* 吸底工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .total-pay {
    font-size: 40rpx;
    color: #cf4444;

    .decimal {
      font-size: 75%;
    }
  }

  .button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 72rpx;
    background-color: #27ba9b;
  }

  .disabled {
    opacity: 0.6;
  }
}
</style>
