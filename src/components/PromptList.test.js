import PromptList from '@/components/PromptList.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '@/stores/store.js'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('PromptList.vue', () => {
  it('renders', () => {
    const wrapper = mount(PromptList, {
      global: {
        mocks: {
          $route: { params: {}, path: '/form/jcblee@gmail.com' },
        },
      },
    })
    expect(wrapper.find('#prompt-list').exists()).toBe(true)
    
  })
})