<template>
  <button
    class="yu-button"
    :class="{
      [`yu-button--${type}`]: type,
      [`yu-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    ref="_ref"
  >
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { defineOptions, ref } from 'vue'
import type { ButtonProps } from './type'
import Icon from '../Icon/Icon.vue'
withDefaults(defineProps<ButtonProps>(), { nativeType: 'button' })
defineOptions({
  name: 'YuButton'
})
// 将dom节点透传出去
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>

<style></style>
