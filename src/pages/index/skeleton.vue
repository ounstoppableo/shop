<template name="skeleton">
  <view class="sk-container">
    <view style="height: 100%; display: flex; flex-direction: column">
      <CustomNavbar></CustomNavbar>
      <scroll-view refresher-enabled="true" scroll-y="true" style="flex: 1">
        <view is="components/xxt-swipper">
          <view class="carousel swipper--carousel">
            <swiper circular="true" interval="3000" current="0" autoplay="false">
              <swiper-item
                style="
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  transform: translate(0%, 0px) translateZ(0px);
                "
              >
                <navigator class="navigator swipper--navigator" hover-class="none">
                  <image class="image swipper--image sk-image" mode="aspectFill"></image>
                </navigator>
              </swiper-item>
            </swiper>
            <view class="indicator swipper--indicator">
              <text class="dot swipper--dot active swipper--active"></text>
              <text class="dot swipper--dot"></text>
              <text class="dot swipper--dot"></text>
              <text class="dot swipper--dot"></text>
              <text class="dot swipper--dot"></text>
            </view>
          </view>
        </view>
        <view is="pages/index/category">
          <view class="category category--category">
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-926 sk-text"
                >居家</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-830 sk-text"
                >锦鲤</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-282 sk-text"
                >服饰</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-293 sk-text"
                >母婴</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-368 sk-text"
                >个护</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-905 sk-text"
                >严选</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-890 sk-text"
                >数码</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-707 sk-text"
                >运动</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-975 sk-text"
                >杂项</text
              >
            </navigator>
            <navigator class="category-item category--category-item" hover-class="none">
              <image class="icon category--icon sk-image"></image>
              <text class="text category--text sk-transparent sk-text-14-2857-406 sk-text"
                >品牌</text
              >
            </navigator>
          </view>
        </view>
        <view is="pages/index/hot">
          <view class="panel hot--panel hot hot--hot">
            <view class="item hot--item">
              <view class="title hot--title">
                <text class="title-text hot--title-text sk-transparent sk-text-14-2857-879 sk-text"
                  >特惠推荐</text
                >
                <text class="title-desc hot--title-desc sk-transparent sk-text-14-2857-195 sk-text"
                  >精选全攻略</text
                >
              </view>
              <navigator class="cards hot--cards" hover-class="none">
                <image class="image hot--image sk-image" mode="aspectFit"></image>
                <image class="image hot--image sk-image" mode="aspectFit"></image>
              </navigator>
            </view>
            <view class="item hot--item">
              <view class="title hot--title">
                <text class="title-text hot--title-text sk-transparent sk-text-14-2857-61 sk-text"
                  >爆款推荐</text
                >
                <text class="title-desc hot--title-desc sk-transparent sk-text-14-2857-450 sk-text"
                  >最受欢迎</text
                >
              </view>
              <navigator class="cards hot--cards" hover-class="none">
                <image class="image hot--image sk-image" mode="aspectFit"></image>
                <image class="image hot--image sk-image" mode="aspectFit"></image>
              </navigator>
            </view>
            <view class="item hot--item">
              <view class="title hot--title">
                <text class="title-text hot--title-text sk-transparent sk-text-14-2857-429 sk-text"
                  >一站买全</text
                >
                <text class="title-desc hot--title-desc sk-transparent sk-text-14-2857-546 sk-text"
                  >精心优选</text
                >
              </view>
              <navigator class="cards hot--cards" hover-class="none">
                <image class="image hot--image sk-image" mode="aspectFit"></image>
                <image class="image hot--image sk-image" mode="aspectFit"></image>
              </navigator>
            </view>
            <view class="item hot--item">
              <view class="title hot--title">
                <text class="title-text hot--title-text sk-transparent sk-text-14-2857-673 sk-text"
                  >新鲜好物</text
                >
                <text class="title-desc hot--title-desc sk-transparent sk-text-14-2857-672 sk-text"
                  >生活加分项</text
                >
              </view>
              <navigator class="cards hot--cards" hover-class="none">
                <image class="image hot--image sk-image" mode="aspectFit"></image>
                <image class="image hot--image sk-image" mode="aspectFit"></image>
              </navigator>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script setup lang="ts">
import CustomNavbar from './CustomNavbar.vue'
</script>
<style>
.sk-transparent {
  color: transparent !important;
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
