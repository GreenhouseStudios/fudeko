import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      user: null,
      loading: false,
      error: false,
      participants: [],
      prompts: [],
      responses: [],
      usersPromptChoices: [],
    };
  },
  persist: {
    storage: sessionStorage,
    paths: ['user'],
  },
  actions: {
    increment() {
      this.count++;
    },
    login(value) {
      this.user = value;
    },
    logout() {  
      this.user = null;
    },
    setPrompts(value) {
      this.prompts = value;
    },
    async getPrompts() {
      const prompts = await supabase.from("prompts").select("id,prompt_text");
      this.prompts = prompts.data;
    },
    async getResponses() {
      const responses = await supabase.from("responses").select();
      this.responses = responses.data;
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
    toggleError() {
      this.error = !this.error;
    },
    async getParticipants() {
      const { data } = await supabase.from("participants").select();
      this.participants = data;
    },
    initializeStore() {
      this.getParticipants();
      this.getPrompts();
      this.getResponses();
    },
    submitResponse() {},
    async getUserPrompts(userEmail) {
      const userID = this.participants.find((p) => p.email === userEmail).id;
      // const result = await supabase.rpc("get_next_prompt_set", {user_id: userID})
      // this.usersPromptChoices = result.data;

      //Get latest three outbounds
      const outs = await supabase
        .from("outbounds")
        .select("prompt")
        .eq("participant", userID)
        .order("created_at", { ascending: false })
        .limit(3);
      this.outbounds = outs.data;
      this.usersPromptChoices = this.prompts.filter((p) =>
        outs.data.map((o) => o.prompt).includes(p.id)
      );
    },
  },
});
