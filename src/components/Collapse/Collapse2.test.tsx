import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
// import { h } from 'vue'
const change = vi.fn()
describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a'],
        change: change
      },
      slots: {
        default: (
          <>
            <CollapseItem name="a" title="title a">
              content a
            </CollapseItem>
            <CollapseItem name="b" title="title b">
              content b
            </CollapseItem>
            <CollapseItem name="c" title="title c">
              content c
            </CollapseItem>
          </>
        )
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })

    const headers = wrapper.findAll('.yu-collapse-item__header')
    const contents = wrapper.findAll('.yu-collapse-item__wrapper')
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    const firstContent = contents[0]
    const secondContent = contents[1]

    await firstHeader.trigger('click')
    await secondHeader.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('change')
    const changeEvent = wrapper.emitted('change') as any[]
    // console.table(changeEvent)
    expect(changeEvent).toHaveLength(2)
    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([['b']])
  })
})
