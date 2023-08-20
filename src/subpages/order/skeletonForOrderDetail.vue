<template name="skeleton">
  <view class="sk-container">
    <view class="navbar" style="padding-top: 20px">
      <view class="wrap">
        <navigator
          class="back icon-left sk-pseudo sk-pseudo-circle"
          open-type="navigateBack"
        ></navigator>
        <view class="title sk-transparent sk-text-14-2857-138 sk-text">订单详情</view>
      </view>
    </view>
    <scroll-view scroll-y="true" class="viewport" id="scroller" enable-back-to-top="true">
      <view class="overview sk-image" style="padding-top: 40px">
        <view
          class="status icon-clock sk-transparent sk-text-0-0000-93 sk-text sk-pseudo sk-pseudo-circle"
          >待付款</view
        >
        <view class="tips">
          <text class="money sk-transparent sk-text-0-0000-475 sk-text">应付金额: ¥ 7799</text>
          <text class="time sk-transparent sk-text-0-0000-817 sk-text">支付剩余</text>
          <view is="node-modules/@dcloudio/uni-ui/lib/uni-countdown/uni-countdown">
            <view
              class="uni-countdown countdown--uni-countdown data-v-342c352a countdown--data-v-342c352a"
            >
              <text
                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-199 sk-text"
                style="
                  color: rgb(255, 255, 255);
                  font-size: 14px;
                  width: 22px;
                  line-height: 20px;
                  border-radius: 3px;
                  background-position-x: 50%;
                "
                >00</text
              >
              <text
                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                style="color: #ffffff; font-size: 12px; margin: "
                >时</text
              >
              <text
                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-542 sk-text"
                style="
                  color: rgb(255, 255, 255);
                  font-size: 14px;
                  width: 22px;
                  line-height: 20px;
                  border-radius: 3px;
                  background-position-x: 50%;
                "
                >28</text
              >
              <text
                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                style="color: #ffffff; font-size: 12px; margin: "
                >分</text
              >
              <text
                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-657 sk-text"
                style="
                  color: rgb(255, 255, 255);
                  font-size: 14px;
                  width: 22px;
                  line-height: 20px;
                  border-radius: 3px;
                  background-position-x: 50%;
                "
                >16</text
              >
              <text
                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                style="color: #ffffff; font-size: 12px; margin: "
                >秒</text
              >
            </view>
          </view>
        </view>
        <view
          class="button sk-transparent sk-text-29-6296-454 sk-text"
          style="background-position-x: 50%"
          >去支付</view
        >
      </view>
      <view class="shipment">
        <view class="locate sk-image">
          <view class="user sk-transparent sk-text-14-2857-86 sk-text">王五 15203079864</view>
          <view class="address sk-transparent sk-text-14-2857-930 sk-text"
            >北京市 北京市 东城区美国</view
          >
        </view>
      </view>
      <view class="goods">
        <view class="item">
          <navigator class="navigator" hover-class="none">
            <image class="cover sk-image"></image>
            <view class="meta">
              <view class="name ellipsis sk-transparent sk-text-14-2857-106 sk-text"
                >木桐正牌干红葡萄酒750毫升2016年</view
              >
              <view class="type sk-transparent sk-text-22-2222-524 sk-text">2016年JS100分</view>
              <view class="price">
                <view class="actual">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="sk-transparent sk-text-14-2857-853 sk-text">7799</text>
                </view>
              </view>
              <view class="quantity sk-transparent sk-opacity">x1</view>
            </view>
          </navigator>
          <view class="action">
            <view
              class="button primary sk-transparent sk-text-28-0000-478 sk-text"
              style="background-position-x: 50%"
            >
              申请售后</view
            >
            <navigator
              class="button sk-transparent sk-text-28-0000-267 sk-text"
              style="background-position-x: 50%"
            >
              去评价
            </navigator>
          </view>
        </view>
        <view class="total">
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-252 sk-text">商品总价: </view>
            <view class="symbol sk-transparent sk-text-0-0000-34 sk-text sk-pseudo sk-pseudo-circle"
              >7799</view
            >
          </view>
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-625 sk-text">运费: </view>
            <view class="symbol sk-transparent sk-opacity sk-pseudo sk-pseudo-circle">0</view>
          </view>
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-164 sk-text">应付金额: </view>
            <view
              class="symbol primary sk-transparent sk-text-0-0000-72 sk-text sk-pseudo sk-pseudo-circle"
              >7799</view
            >
          </view>
        </view>
      </view>
      <view class="detail">
        <view class="title sk-transparent sk-text-0-0000-5 sk-text">订单信息</view>
        <view class="row">
          <view class="item sk-transparent">
            订单编号: 1692863649011470337
            <text class="copy sk-transparent sk-text-0-0000-409 sk-text">复制</text>
          </view>
          <view class="item sk-transparent sk-text-0-0000-455 sk-text"
            >下单时间: 2023-08-19 19:38:40</view
          >
        </view>
      </view>
      <view is="components/xxt-guess" class="r">
        <view class="caption guess--caption">
          <text
            class="text guess--text sk-transparent sk-text-0-0000-798 sk-text sk-pseudo sk-pseudo-circle"
            >猜你喜欢</text
          >
        </view>
        <view class="guess guess--guess">
          <navigator class="guess-item guess--guess-item"></navigator>
          <navigator class="guess-item guess--guess-item"></navigator>
        </view>
      </view>
      <view class="toolbar" style="padding-bottom: 0px">
        <view class="button primary sk-transparent sk-text-14-2857-773 sk-text"> 去支付 </view>
        <view class="button sk-transparent sk-text-14-2857-89 sk-text"> 取消订单 </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts"></script>
<style>
.sk-transparent {
  color: transparent !important;
}

.sk-text-14-2857-138 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 42.6563rpx;
  position: relative !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text-0-0000-93 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 35.1563rpx;
  position: relative !important;
}

.sk-text-0-0000-475 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}

.sk-text-0-0000-817 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}

.sk-text-15-0000-199 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 46.875rpx;
  position: relative !important;
}

.sk-opacity {
  opacity: 0 !important;
}

.sk-text-15-0000-542 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 46.875rpx;
  position: relative !important;
}

.sk-text-15-0000-657 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 46.875rpx;
  position: relative !important;
}

.sk-text-29-6296-454 {
  background-image: linear-gradient(
    transparent 29.6296%,
    #eeeeee 0%,
    #eeeeee 70.3704%,
    transparent 0%
  ) !important;
  background-size: 100% 63.2813rpx;
  position: relative !important;
}

.sk-text-14-2857-86 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-930 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}

.sk-text-14-2857-106 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-22-2222-524 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 42.1875rpx;
  position: relative !important;
}

.sk-text-14-2857-853 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.8125rpx;
  position: relative !important;
}

.sk-text-28-0000-478 {
  background-image: linear-gradient(
    transparent 28%,
    #eeeeee 0%,
    #eeeeee 72%,
    transparent 0%
  ) !important;
  background-size: 100% 58.5938rpx;
  position: relative !important;
}

.sk-text-28-0000-267 {
  background-image: linear-gradient(
    transparent 28%,
    #eeeeee 0%,
    #eeeeee 72%,
    transparent 0%
  ) !important;
  background-size: 100% 58.5938rpx;
  position: relative !important;
}

.sk-text-0-0000-252 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}

.sk-text-0-0000-34 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}

.sk-text-0-0000-625 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}

.sk-text-0-0000-164 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}

.sk-text-0-0000-72 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 35.1563rpx;
  position: relative !important;
}

.sk-text-0-0000-5 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 28.125rpx;
  position: relative !important;
}

.sk-text-0-0000-409 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 18.75rpx;
  position: relative !important;
}

.sk-text-0-0000-455 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}

.sk-text-0-0000-798 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30.4688rpx;
  position: relative !important;
}

.sk-text-14-2857-773 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-text-14-2857-89 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.0938rpx;
  position: relative !important;
}

.sk-image {
  background: #efefef !important;
}

.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}

.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}

.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}

.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
