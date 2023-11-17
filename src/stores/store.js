import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 0,
      user: null,
      userID: 0,
      prompts: [],
      loading: false,
      error: false,
      participants: [],
      usersPromptChoices: [],
    };
  },
  actions: {
    increment() {
      this.count++;
    },
    login(value) {
      this.user = value;
    },
    setPrompts(value) {
      this.prompts = value;
    },
    async getPrompts() {
      const prompts = await supabase.from("prompts").select("id,prompt_text");
      this.prompts = prompts.data;
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
    },
    submitResponse() {},
    async getUserPrompts(userEmail) {
      const userID = this.participants.find((p) => p.email === userEmail).id;
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
