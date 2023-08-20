<template name="skeleton">
  <view class="sk-container">
    <view class="viewport">
      <view class="cover">
        <image class="sk-image"></image>
      </view>
      <view class="tabs">
        <text
          class="text active sk-transparent sk-text-34-4444-729 sk-text sk-pseudo sk-pseudo-circle"
          >抢先尝鲜</text
        >
        <text class="text sk-transparent sk-text-34-4444-201 sk-text">新品预告</text>
      </view>
      <scroll-view scroll-y="true" class="scroll-view" scroll-top="0">
        <view class="goods">
          <navigator class="navigator" hover-class="none">
            <image class="thumb sk-image"></image>
            <view class="name ellipsis sk-transparent sk-text-14-2857-935 sk-text"
              >地道卤香好味道，桂林鲜米粉245克*6盒</view
            >
            <view class="price">
              <text class="symbol sk-transparent sk-opacity">¥</text>
              <text class="number sk-transparent sk-text-0-0000-159 sk-text">69.00</text>
            </view>
          </navigator>
          <navigator class="navigator" hover-class="none">
            <image class="thumb sk-image"></image>
            <view class="name ellipsis sk-transparent sk-text-14-2857-204 sk-text"
              >智能自动回弹健腹滚轮</view
            >
            <view class="price">
              <text class="symbol sk-transparent sk-opacity">¥</text>
              <text class="number sk-transparent sk-text-0-0000-443 sk-text">249.00</text>
            </view>
          </navigator>
          <navigator class="navigator" hover-class="none">
            <image class="thumb sk-image"></image>
            <view class="name ellipsis sk-transparent sk-text-14-2857-280 sk-text"
              >发现隐藏角落的摄像头，多功能红外探测仪</view
            >
            <view class="price">
              <text class="symbol sk-transparent sk-opacity">¥</text>
              <text class="number sk-transparent sk-text-0-0000-230 sk-text">99.00</text>
            </view>
          </navigator>
          <navigator class="navigator" hover-class="none">
            <image class="thumb sk-image"></image>
            <view class="name ellipsis sk-transparent sk-text-14-2857-819 sk-text"
              >湿水不易破臻护倍韧4层软抽纸巾6包/提</view
            >
            <view class="price">
              <text class="symbol sk-transparent sk-opacity">¥</text>
              <text class="number sk-transparent sk-text-0-0000-798 sk-text">29.90</text>
            </view>
          </navigator>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script setup lang="ts"></script>
<style>
.sk-transparent {
  color: transparent !important;
}

.sk-text-34-4444-729 {
  background-image: linear-gradient(
    transparent 34.4444%,
    #eeeeee 0%,
    #eeeeee 65.5556%,
    transparent 0%
  ) !important;
  background-size: 100% 90rpx;
  position: relative !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text-34-4444-201 {
  background-image: linear-gradient(
    transparent 34.4444%,
    #eeeeee 0%,
    #eeeeee 65.5556%,
    transparent 0%
  ) !important;
  background-size: 100% 90rpx;
  position: relative !important;
}

.sk-text-14-2857-935 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}

.sk-opacity {
  opacity: 0 !important;
}

.sk-text-0-0000-159 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30rpx;
  position: relative !important;
}

.sk-text-14-2857-204 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}

.sk-text-0-0000-443 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30rpx;
  position: relative !important;
}

.sk-text-14-2857-280 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}

.sk-text-0-0000-230 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30rpx;
  position: relative !important;
}

.sk-text-14-2857-819 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}

.sk-text-0-0000-798 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30rpx;
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
