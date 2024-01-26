import { useCounterStore } from "@/stores/store";
import { setActivePinia, createPinia } from "pinia";

describe("store", () => {
  let store = null;
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
    store = useCounterStore();
  });

  it("should have a default state", () => {
    const defaultState = {
      user: {
        name: "John Doe",
        email: "john.doe@uconn.edu",
        id: 1,
      },
      prompts: [],
      loading: false,
      error: false,
      participants: [],
      usersPromptChoices: [],
    };
    expect(store.state).toEqual(defaultState);
  });
});
