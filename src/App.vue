<template>
  <div>
    <Icon icon="arrow-up" :size="iconVaue" rotation="90" type="danger"></Icon>
  </div>
  <div>
    <h1>Button</h1>
    <div>-------test attr</div>
    <Button type="primary" ref="buttonRef">Test Button</Button>
    <Button plain> test plain</Button>
    <Button round>round button</Button>
    <Button circle>circle button</Button>
    <Button disabled>diabled button</Button>
    <div>-------test type</div>
    <Button type="primary">primary Button</Button>
    <Button type="success">success Button</Button>
    <Button type="warning">warning Button</Button>
    <Button type="danger">danger Button</Button>
    <Button type="info">info Button</Button>
    <div>-----plain</div>
    <Button plain type="primary">primary Button</Button>
    <Button plain type="success">success Button</Button>
    <Button plain type="warning">warning Button</Button>
    <Button plain type="danger">danger Button</Button>
    <Button plain type="info">info Button</Button>
    <div>----size</div>
    <Button type="primary" size="small">small Button</Button>
    <Button type="primary">normal Button</Button>
    <Button type="primary" size="large">Large Button</Button>
    <div>----icon</div>
    <Button type="primary" size="small" loading>loading Button</Button>
    <Button type="primary" icon="arrow-up">icon Button</Button>
  </div>
  <div class="w">
    <h1>Collapse</h1>
    <Collapse v-model="openValue" accordion @change="change">
      <CollapseItem :name="1">
        <template #title>
          <h1>this is title</h1>
        </template>
        <div>this is content ....</div>
      </CollapseItem>
      <CollapseItem :name="2" :title="'this is title bbbbb'">
        <div>this is bbbbb ....</div>
      </CollapseItem>
      <CollapseItem :name="3" :title="'this is title cccc'">
        <div>this is ccccc ....</div>
      </CollapseItem>
    </Collapse>
    {{ openValue }}
  </div>
  <div class="alert-test w">
    <Alert :type="'success'" @close="close"> success alert </Alert>
    <Alert :type="'warning'"> warning alert </Alert>
    <Alert :type="'info'"> info alert </Alert>
    <Alert :type="'error'"> error alert </Alert>
  </div>
  <div class="alert-test w">
    <h1>effect-type: dark</h1>
    <Alert :effect-type="'dark'" :type="'success'"> success alert </Alert>
    <Alert :effect-type="'dark'" :type="'warning'"> warning alert </Alert>
    <Alert :effect-type="'dark'" :type="'info'"> info alert </Alert>
    <Alert :effect-type="'dark'" :type="'error'"> error alert </Alert>
  </div>
  <div class="alert-test w">
    <h1>show icon</h1>
    <Alert show-icon :type="'success'"> success alert </Alert>
    <Alert show-icon :type="'warning'"> warning alert </Alert>
    <Alert show-icon :type="'info'"> info alert </Alert>
    <Alert show-icon :type="'error'"> error alert </Alert>
  </div>
  <div class="vnode w">
    <Vnode :msg="'this is vnode'"></Vnode>
  </div>

  <div class="popper-js-test">
    <div
      class="overlayNode"
      ref="overlayNode"
      :style="{ textAlign: 'center', backgroundColor: 'pink' }"
    >
      <h1>hello tooltip</h1>
    </div>
    <div class="triggerNode" ref="triggerNode">trigger</div>
  </div>

  <div class="test1 w">
    <Tooltip
      :trigger="triggerRef"
      ref="tooltipRef"
      :placement="'top'"
      :open-delay="0"
      :close-delay="0"
    >
      <div>trigger</div>
      <template #content> 呵呵呵呵呵呵 </template>
    </Tooltip>
    <Button @click="open">show</Button>
    <Button @click="hide">hide</Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import type { ButtonInstance } from './components/Button/type'
import Button from '@/components/Button/Button.vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
import Icon from '@/components/Icon/Icon.vue'
import Alert from '@/components/Alert/Alert.vue'
import Vnode from '@/components/Test/VNode.vue'
import type { NameType } from './components/Collapse/type'
import Tooltip from './components/Tooltip/Tooltip.vue'
import type { TooltipInstace, PopperOptions } from './components/Tooltip/type'
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstace | null>(null)
const openValue = ref([1])
const iconVaue = ref<'xl' | '2xl'>('xl')
const triggerRef = ref<'click' | 'hover'>('hover')
const overlayNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
const options: PopperOptions = {
  placement: 'bottom',
  strategy: 'fixed'
}
const open = () => {
  tooltipRef.value?.show()
}
const hide = () => {
  tooltipRef.value?.hide()
}
onMounted(() => {
  if (overlayNode.value && triggerNode.value) {
    popperInstance = createPopper(triggerNode.value, overlayNode.value, {
      placement: 'left'
    })
  }

  setTimeout(() => {
    iconVaue.value = '2xl'
    popperInstance?.setOptions({
      placement: 'bottom'
    })
    // triggerRef.value = 'hover'
  }, 2000)
})
const close = () => {
  console.log('close....')
}

const change = (values: NameType[]) => {
  console.log(values, '============')
}
</script>

<style scoped>
.w {
  width: 500px;
}
.alert-test {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
}

.popper-js-test {
  height: 500px;
}

.triggerNode {
  margin: 100px auto;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: yellow;
}

.test1 {
  margin: 0 auto;
  padding: 100px;
}
</style>
