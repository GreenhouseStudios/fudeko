import ResponseForm from './ResponseForm.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '@/stores/store.js'

beforeEach(() => {
  setActivePinia(createPinia())
})

// Mock child components
vi.mock('@/components/WritingTip.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/AdminResponseConfig.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/ResponseDifficultySelect.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/ShareOptionSelect.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/FormMediaUpload.vue', () => ({ default: { template: '<div />' } }))
vi.mock('primevue/editor', () => ({ default: { template: '<textarea />' } }))

describe('ResponseForm.vue', () => {
  it('renders', () => {
    const wrapper = mount(ResponseForm, {
      global: {
        mocks: {
          $route: { params: {}, path: '/form/page2/62' },
        },
        provide: {
          useCounterStore: () => ({
            participantRecord: { id: 1 },
            prompts: [],
            partialResponse: null
          }),
        },
      },
      data() {
        return {
          participantRecord: { id: 1 },
          hasUnansweredSets: true,
        }
      }
    })
    expect(wrapper.find('#response-form').exists()).toBe(true)
    expect(wrapper.find('#prompt-text').exists()).toBe(true)
    expect(wrapper.find('#prompt-subtext').exists()).toBe(true)
    expect(wrapper.find('#editor').exists()).toBe(true)
    expect(wrapper.find('#writing-tip').exists()).toBe(true)
    expect(wrapper.find('#form-media-upload').exists()).toBe(true)
    expect(wrapper.find('#share-option-select').exists()).toBe(true)
    expect(wrapper.find('#response-submit').exists()).toBe(true)
    expect(wrapper.find('#response-difficulty-select').exists()).toBe(true)

  })

  it('renders adminresponseconfig if isAdminRoute', () => {

    const wrapper = mount(ResponseForm, {
      global: {
        mocks: {
          $route: { params: {}, path: '/responses/new' },
        },

      },
    })
    expect(wrapper.find('#admin-response-config-container').exists()).toBe(true)

  }
  )

  // it('does not render main container if no participantRecord and not admin', () => {
  //   const wrapper = mount(ResponseForm, {
  //     global: {
  //       mocks: {
  //         $route: { params: {}, path: '/some-path' },
  //       },
  //     },
  //     data() {
  //       return {
  //         participantRecord: null,
  //         isAdminRoute: false,
  //       }
  //     }
  //   })
  //   expect(wrapper.find('#response-write').exists()).toBe(false)
  // })

  // it('disables submit button when response is empty', () => {
  //   const wrapper = mount(ResponseForm, {
  //     global: {
  //       mocks: {
  //         $route: { params: {}, path: '/some-path' },
  //       },
  //     },
  //     data() {
  //       return {
  //         response: '',
  //         shareOption: { name: 'Keep Private' },
  //         attrOption: { name: 'CreditWithGivenName' },
  //         creditName: '',
  //       }
  //     }
  //   })

  //   const submitBtn = wrapper.find('button')
  //   expect(submitBtn.attributes('disabled')).toBeDefined()
  // })

  // it('enables submit button with valid input', () => {
  //   const wrapper = mount(ResponseForm, {
  //     global: {
  //       mocks: {
  //         $route: { params: {}, path: '/some-path' },
  //       },
  //     },
  //     data() {
  //       return {
  //         response: 'Some response',
  //         shareOption: { name: 'Keep Private' },
  //         attrOption: { name: 'CreditWithGivenName' },
  //         creditName: '',
  //       }
  //     }
  //   })

  //   const submitBtn = wrapper.find('button')
  //   expect(submitBtn.attributes('disabled')).toBeUndefined()
  // })
})