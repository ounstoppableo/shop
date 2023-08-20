<script setup lang="ts">
import { ref } from 'vue'
import type { addAddressForm } from '@/services/types/address'
import { getAddressById, updateAddress } from '@/services/address'
import { onLoad } from '@dcloudio/uni-app'
const query = defineProps(['id'])
//获取表单实例
const formRef = ref<UniHelper.FormInstance & { validate: () => {}; setRules: (rules: any) => {} }>()
//设置标题
uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新建地址' })
// 表单数据
const form = ref<addAddressForm>({} as addAddressForm)
query.id ? (form.value.id = query.id) : null
//校验规则
const rules = ref({
  receiver: {
    rules: [
      {
        required: true,
        errorMessage: '请填写收货人姓名',
      },
    ],
  },
  contact: {
    rules: [
      {
        required: true,
        errorMessage: '请输入手机号码',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^1[3-9]\d{9}$/.test(value)) {
            callback('请填写正确的手机号码')
          }
          return true
        },
      },
    ],
  },
  fullLocation: {
    rules: [
      {
        required: true,
        errorMessage: '请选择所在地区',
      },
    ],
  },
  address: {
    rules: [
      {
        required: true,
        errorMessage: '请填写详细地址',
      },
    ],
  },
})
//picker发生变化
const locationChange = (ev: UniHelper.PickerViewOnChangeEvent) => {
  const [provinceCode, cityCode, countyCode] = (ev.detail as any).code
  Object.assign(form.value, {
    provinceCode,
    cityCode,
    countyCode,
    fullLocation: ev.detail.value.join(' '),
  })
}
//获取当前修改中的地址的信息
const toGetAddressById = async () => {
  const res = await getAddressById(form.value.id as string)
  Object.assign(form.value, res.result)
}
//switch发生变化
const switchChange = (ev: UniHelper.SwitchOnChangeEvent) => {
  form.value.isDefault = ev.detail.value ? 1 : 0
}
//确认提交表单
const confirm = async () => {
  try {
    await formRef.value?.validate()
    form.value.isDefault = form.value.isDefault ? 1 : 0
    const res = await updateAddress(form.value)
    if (res.code === '1') {
      uni.showToast({ title: '添加成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    }
  } catch (err) {
    console.log(err)
  }
}
onLoad(() => {
  if (form.value.id) {
    toGetAddressById()
  }
})
</script>

<template>
  <view class="content">
    <uni-forms ref="formRef" :model="form" :rules="rules">
      <!-- 表单内容 -->
      <uni-forms-item class="form-item" name="receiver">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="contact">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="fullLocation">
        <text class="label">所在地区</text>
        <picker class="picker" mode="region" @change="locationChange" value="">
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item class="form-item" name="address">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <uni-forms-item class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          color="#27ba9b"
          :checked="form.isDefault || false"
          @change="switchChange"
        />
      </uni-forms-item>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="confirm">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      bottom: -15rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
