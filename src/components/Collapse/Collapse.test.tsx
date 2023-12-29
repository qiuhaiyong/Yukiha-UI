import { describe, expect, test, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
// import { h } from 'vue'
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>
describe('Collapse.vue', () => {
  // test('basic collapse',async () => {
  //   const wrapper = mount( ()=> (
  //     <Collapse modelValue={["a"]}>
  //       <CollapseItem name="a" title='title a'>content a</CollapseItem>
  //       <CollapseItem name="b" title='title b'>content b</CollapseItem>
  //       <CollapseItem name="c" title='title c' disabled>content c</CollapseItem>
  //     </Collapse>
  //   ),{
  //     global:{
  //       stubs:['Icon']
  //     },
  //     attachTo:document.body
  //   })
  //   // console.log(wrapper.html())
  //   const headers = wrapper.findAll('.yu-collapse-item__header')
  //   const contents = wrapper.findAll('.yu-collapse-item__wrapper')

  //   // 行为

  //   // disabled
  //   const disabledHeader = headers[2]
  //   const disabledContent = contents[2]
  //   expect(disabledHeader.classes()).toContain('is-disabled')
  //   await disabledHeader.trigger('click')
  //   expect(disabledContent.isVisible()).toBeFalsy()
  // })

  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={['a']}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),

      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      }
    )

    headers = wrapper.findAll('.yu-collapse-item__header')
    contents = wrapper.findAll('.yu-collapse-item__wrapper')
    firstContent = contents[0]
    secondContent = contents[1]
    firstHeader = headers[0]
    secondHeader = headers[1]
  })

  test('测试基础结构以及对应文本', () => {
    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // 文本
    expect(firstHeader.text()).toBe('title a')
    // 内容
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })

  test('点击标题展开/关闭内容', async () => {
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })

  test.skip('发送正确的事件', async () => {
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })

  test('disabled的内容应该没有反应', async () => {
    const disabledHeader: DOMWrapper<Element> = headers[2]
    const disabledContent: DOMWrapper<Element> = contents[2]
    onChange.mockClear()
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
})
