<template>
  <Transition name="fade">
    <div
      class="yu-alert"
      :class="{ [`yu-alert--${type}`]: type, [`yu-alert--${effectType}`]: effectType }"
      v-if="showAlert"
    >
      <div class="yu-alert-icon">
        <Icon :icon="iconValue[type]" v-if="showIcon"></Icon>
      </div>
      <div class="yu-alert__content">
        <span class="yu-alert__title">
          <slot>
            {{ content }}
          </slot>
        </span>
        <Icon
          class="yu-alert__close-btn"
          icon="x"
          size="2xs"
          v-if="closable"
          @click="closeAlert"
        ></Icon>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { AlertProps, AlertEmits } from './type'
import { ref } from 'vue'
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'YuAlert'
})
withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  effectType: 'ligth',
  closable: true
})

const emits = defineEmits<AlertEmits>()

const showAlert = ref<boolean>(true)
const iconValue = {
  success: 'circle-check',
  info: 'circle-info',
  warning: 'circle-exclamation',
  error: 'circle-xmark'
}
const closeAlert = () => {
  showAlert.value = false
  emits('close')
}
</script>

<style></style>
