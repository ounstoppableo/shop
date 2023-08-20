import { ref } from 'vue'
import type { guessInstence } from '@/type/components'
export const xxtguess = () => {
  const guessRef = ref<guessInstence>()
  return {
    guessRef,
  }
}
