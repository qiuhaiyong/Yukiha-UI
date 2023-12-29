<template>
  <div class="yu-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="yu-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div class="yu-tooltip__popper" ref="popperNode" v-if="isOpen">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onUnmounted, computed } from 'vue'
import type { TooltipEmits, TooltipProps, TooltipInstace } from './type'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import useClickOutside from '../../hooks/useClickOutside'
import { debounce } from 'lodash-es'
defineOptions({
  name: 'yu-tooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'left',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})

const open = () => {
  isOpen.value = true
  emits('visible-change', isOpen.value)
}

const close = () => {
  isOpen.value = false
  emits('visible-change', isOpen.value)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const oepnFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}

const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    oepnFinal()
  }
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    close()
  }
})

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = oepnFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

if (!props.manual) {
  attachEvents()
}

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger && !props.manual) {
      // clear events
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstace>({
  show: oepnFinal,
  hide: closeFinal
})
</script>
