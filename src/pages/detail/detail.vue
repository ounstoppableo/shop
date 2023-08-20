<script setup lang="ts">
import { getGood } from '@/services/detail'
import type { detailResult } from '@/services/types/detail'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Address from './address.vue'
import Service from './service.vue'
import Skeleton from './skeleton.vue'
import { addCart } from '@/services/cart'
import type { getAddressRes } from '@/services/types/address'
import { nextTick } from 'vue'

//获取弹出层ref
const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
//判断是否加载中
const loading = ref<boolean>(true)
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//获取id
const query = defineProps(['id'])
const detailData = ref<detailResult>()
//获取数据
const getDetailData = async () => {
  const res = await getGood(query.id)
  detailData.value = res.result as detailResult
}
const actvieIndex = ref<number>(0)
//swiper发生改变的回调
const swiperChange = (val: UniHelper.SwiperOnChangeEvent) => {
  actvieIndex.value = val.detail.current
}
onLoad(async () => {
  await getDetailData()
  loading.value = false
  goodsInfo.value = {
    _id: detailData.value?.id,
    name: detailData.value?.name,
    goods_thumb: detailData.value?.mainPictures[0],
    sku_list: [],
    spec_list: [],
  }
  detailData.value?.skus.forEach((item) => {
    goodsInfo.value.sku_list.push({
      _id: item.id,
      goods_id: item.skuCode,
      goods_name: detailData.value?.name,
      image: item.picture,
      price: +item.price * 100,
      sku_name_arr: item.specs.map((item) => item.valueName),
      stock: item.inventory,
    })
  })
  detailData.value?.specs.forEach((item) => {
    goodsInfo.value.spec_list.push({
      name: item.name,
      list: item.values,
    })
  })
})
//选择弹出层的内容
const popContent = ref<'address' | 'service'>()
//打开弹出层
const openPop = (type: typeof popContent.value) => {
  popContent.value = type
  popup.value?.open('bottom')
}
const close = () => {
  popup.value?.close()
}
//控制sku窗口的打开
const skuKey = ref(false)
//存储sku数据
const goodsInfo = ref<any>({})
//获取已选属性
const select = ref<string>()
function selected(val: string[]) {
  select.value = val.join(' ').trim()
}
//添加到购物车的回调
const addToCart = async (ev: any) => {
  const { _id, buy_num } = ev
  const res = await addCart(_id, buy_num)
  if (res.code === '1') {
    uni.showToast({ title: '添加成功', icon: 'success' })
    skuKey.value = false
  } else {
    uni.showToast({ title: '添加失败', icon: 'error' })
  }
}
//是否显示addcart和buynow按钮的回调
enum isShowBtn {
  all = 1,
  addCart = 2,
  buyNow = 3,
}
const btnmode = ref<number>(1)
//底部按钮打开sku的回调
const openSku = (type: isShowBtn) => {
  btnmode.value = type
  skuKey.value = true
}
//立即购买
const buyNow = (selectShop: any) => {
  if (address.value) {
    uni.navigateTo({
      url: `/subpages/order/order?type=buyNow&skuId=${selectShop._id}&count=${selectShop.buy_num}&addressId=${address.value.id}`,
    })
  } else {
    uni.showToast({ title: '请选择地址', icon: 'none' })
  }
}
//用于控制address
const address = ref<getAddressRes>()
const getAddress = (val: getAddressRes) => {
  address.value = val
}
//解决地址更新问题
onShow(() => {
  if (popContent.value === 'address') {
    popContent.value = undefined
  }
  nextTick(() => (popContent.value = 'address'))
})
</script>

<template>
  <Skeleton v-if="loading"></Skeleton>
  <scroll-view scroll-y class="viewport" v-if="!loading">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper circular @change="swiperChange">
          <swiper-item v-for="item in detailData?.mainPictures" :key="item">
            <image mode="aspectFill" :src="item" />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">{{ actvieIndex + 1 }}</text>
          <text class="split">/</text>
          <text class="total">{{ detailData?.mainPictures.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ detailData?.price }}</text>
        </view>
        <view class="name ellipsis">{{ detailData?.name }} </view>
        <view class="desc"> {{ detailData?.desc }} </view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow" @tap="openSku(isShowBtn.all)">
          <text class="label">选择</text>
          <text class="text ellipsis" v-if="select"> {{ select }} </text>
          <text class="text ellipsis" v-if="!select"> 请选择商品规格 </text>
        </view>
        <view class="item arrow" @tap="openPop('address')">
          <text class="label">送至</text>
          <text class="text ellipsis" v-if="address">
            {{ address?.fullLocation + ' ' + address?.address }}
          </text>
          <text class="text ellipsis" v-if="!address"> 请选择收获地址 </text>
        </view>
        <view class="item arrow" @tap="openPop('service')">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
    </view>
    <!-- 弹出层 -->
    <uni-popup ref="popup" type="bottom">
      <Address @close="close" @getAddress="getAddress" v-if="popContent === 'address'"></Address>
      <Service @close="close" v-if="popContent === 'service'"></Service>
    </uni-popup>
    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <view class="item" v-for="item in detailData?.specs" :key="item.id">
            <text class="label">{{ item.name }}</text>
            <text class="value" v-for="value in item.values" :key="value.name">{{
              value.name
            }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image
          mode="widthFix"
          v-for="pic in detailData?.details.pictures"
          :key="pic"
          :src="pic"
        ></image>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <navigator
          v-for="item in detailData?.similarProducts"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/detail/detail?id=${item.id}`"
        >
          <image class="image" mode="aspectFill" :src="item.picture"></image>
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>
  </scroll-view>
  <vk-data-goods-sku-popup
    ref="skuPopup"
    @selected="selected"
    border-radius="20"
    v-model="skuKey"
    :localdata="goodsInfo"
    :mode="btnmode"
    add-cart-background-color="#ffa868"
    buy-now-background-color="#27ba9b"
    @add-cart="addToCart"
    @buy-now="buyNow"
  ></vk-data-goods-sku-popup>
  <!-- 用户操作 -->
  <view v-if="!loading" class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <navigator class="icons-button" url="/pages/cart/cart2">
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @tap="openSku(isShowBtn.addCart)"> 加入购物车 </view>
      <view class="buynow" @tap="openSku(isShowBtn.buyNow)"> 立即购买 </view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;

    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }

    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;

  .preview {
    height: 750rpx;
    position: relative;

    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;

      .current {
        font-size: 26rpx;
      }

      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }

      .total {
        font-size: 24rpx;
      }
    }
  }

  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;

    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }

    .number {
      font-size: 56rpx;
    }

    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }

    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }

    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }

  .action {
    padding-left: 20rpx;

    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;

      &:last-child {
        border-bottom: 0 none;
      }
    }

    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }

    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;

  .content {
    margin-left: -20rpx;
  }

  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;

    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }

    .label {
      width: 200rpx;
    }

    .value {
      flex: 1;
    }
  }
}

/* 同类推荐 */
.similar {
  padding-left: 20rpx;

  .content {
    padding: 0 20rpx 20rpx;
    margin-left: -20rpx;
    background-color: #f4f4f4;
    overflow: hidden;

    navigator {
      width: 345rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 20rpx 0 0;
      border-radius: 10rpx;
      background-color: #fff;
      float: left;
    }

    .image {
      height: 260rpx;
    }

    .name {
      height: 80rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }

    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }

    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }

  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .buttons {
    display: flex;

    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }

    .addcart {
      background-color: #ffa868;
    }

    .buynow {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }

  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;

    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
    }

    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
