<template>
  <div class="yu-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './type'
import { collapseContextKey } from './type'
defineOptions({
  name: 'YuCollapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one active item')
}
const handleItemClick = (name: NameType) => {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === name ? '' : name]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(name)
    if (index > -1) {
      // 存在,删除数组对应的一项
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(name)
    }

    activeNames.value = _activeNames
  }

  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}
provide(collapseContextKey, { activeNames, handleItemClick })
</script>

<style></style>
