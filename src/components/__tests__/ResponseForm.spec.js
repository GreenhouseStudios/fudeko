import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useCounterStore } from '@/stores/store'
import ResponseForm from "../ResponseForm";

const wrapper = shallowMount(ResponseForm, {
    global: {
        plugins: [createTestingPinia()],
        mocks: {
            $router: {
                push: jest.fn()
            },
            $route: {
                params: {
                    id: 1
                },
                path: '/form/user@test.com/1'
            },
            localStorage: {
                setItem: jest.fn(),
                getItem: jest.fn()
            }
        }
    },
    
});

const store = useCounterStore();

test('sets response data from localStorage if it exists', () => {
  const response = "";
    localStorage.setItem('response', JSON.stringify(response));
    expect(wrapper.vm.response).toBe(response);
});

test('writes response to localStorage when the value changes', () => {
    const response = "";
    wrapper.vm.response = response;
    expect(localStorage.setItem).toHaveBeenCalledWith('response', JSON.stringify(response));
});