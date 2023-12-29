<template>
  <i class="yu-icon" :class="{ [`yu-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './type.ts'
defineOptions({
  name: 'YuIcon',
  inheritAttrs: false
})
const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<style></style>
