import PromptButton from '@/components/form/PromptButton.vue';
import { mount } from '@vue/test-utils';

describe('PromptButton.vue', () => {
  it('renders', () => {
    const wrapper = mount(PromptButton, {
      props: {
        prompt: {
          id: 1,
          prompt_text: 'Test Prompt',
        },
      },
    })
    expect(wrapper.find('#prompt-button').exists()).toBe(true)
    expect(wrapper.find('#prompt-select-button').text()).toContain('Test Prompt')
    
  })

  it('sets the active prompt on click', async () => {

    const wrapper = mount(PromptButton, {
      props: {
        prompt: {
          id: 1,
          prompt_text: 'Test Prompt',
        },
      },
    })

    // await wrapper.find('#prompt-select-button').trigger('click')
    // expect(wrapper.emitted('setActivePrompt')).toBeTruthy()
    // expect(wrapper.emitted('setActivePrompt')[0]).toEqual([1])
  }
  )
})