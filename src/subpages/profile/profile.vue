<script setup lang="ts">
import type { editForm } from '@/services/types/login'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getInfo, editInfo } from '@/services/login'
import { useMemberStore } from '@/stores/modules/member'
import { editAvatar } from '@/services/login'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
//store下的用户信息
const userInfo = useMemberStore()
//用户信息存储
const profile = ref<editForm>({} as editForm)
//获取用户信息
const getInfoData = async () => {
  const res = await getInfo()
  profile.value = res.result as editForm
}
//修改昵称
const nicknameChange = (ev: UniHelper.InputOnBlurEvent) => {
  profile.value.nickname = ev.detail.value
}
//修改性别
const sexChange = (ev: UniHelper.RadioGroupOnChangeEvent) => {
  profile.value.gender = ev.detail.value
}
//生日改变
const birthChange = (ev: UniHelper.PickerViewOnChangeEvent) => {
  profile.value.birthday = ev.detail.value as any
}
//城市改变
const cityChange = (ev: UniHelper.PickerViewOnChangeEvent) => {
  profile.value.fullLocation = (ev.detail.value as any[]).join(' ')
  profile.value.provinceCode = (ev.detail as any).code[0]
  profile.value.cityCode = (ev.detail as any).code[1]
  profile.value.countyCode = (ev.detail as any).code[2]
}
//职业改变
const professionChange = (ev: UniHelper.PickerViewOnChangeEvent) => {
  profile.value.profession = ev.detail.value as any
}
//上传头像
const uploadAvatar = () => {
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: async (success) => {
      const res = await editAvatar(success.tempFiles[0].tempFilePath)
      if (res.statusCode === 200) {
        userInfo.profile!.avatar = JSON.parse(res.data).result.avatar
        uni.showToast({ title: '上传成功', icon: 'success' })
      } else {
        uni.showToast({ title: '上传失败', icon: 'error' })
      }
    },
  })
}
onLoad(() => {
  getInfoData()
})
//保存回调
const confirm = async () => {
  await editInfo(profile.value)
  uni.showToast({ title: '修改成功', icon: 'success' })
  userInfo.profile!.nickname = profile.value.nickname
  setTimeout(() => {
    uni.switchTab({ url: '/pages/my/my' })
  }, 500)
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content">
        <image class="image" :src="profile?.avatar" mode="aspectFill" @tap="uploadAvatar" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            @blur="nicknameChange"
            :value="profile?.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="sexChange">
            <label class="radio">
              <radio
                value="男"
                color="#27ba9b"
                :checked="profile.gender === '男' || !profile.gender"
              />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            value="2000-01-01"
            @change="birthChange"
          >
            <view v-if="profile.birthday">{{ profile.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="profile.fullLocation?.split(' ')"
            @change="cityChange"
          >
            <view v-if="profile.fullLocation">{{ profile.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            @blur="professionChange"
            :placeholder="profile.profession ? profile.profession : '请填写职业'"
            :value="profile.profession ? profile.profession : ''"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="confirm">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
