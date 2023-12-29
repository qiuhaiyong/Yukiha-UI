import { describe, test, expect } from 'vitest'
import Button from './Button.vue'
import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../Icon/Icon.vue'
describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('yu-button--primary')
    // slot
    // get(会中断测试), find(不会中断测试)
    expect(wrapper.get('button').text()).toBe('button')
    // events
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        disabled: true
      },
      slots: {
        default: 'button'
      }
    })
    // attributes
    expect(wrapper.attributes('disabled')).toBeDefined()
    // attributes
    expect(wrapper.find('button').element.disabled).toBeDefined()
    //
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      // 引入第三方组件，简化掉
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      // 引入第三方组件，简化掉
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
