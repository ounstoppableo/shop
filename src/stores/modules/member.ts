import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { loginRes } from '@/services/types/login'
// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<loginRes>()

    // 保存会员信息，登录时使用
    const setProfile = (val: loginRes) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    persist: {
      storage: {
        getItem(key: string) {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
