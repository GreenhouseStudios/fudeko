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
      promptDifficulties: [],
      promptAssociations: [],
      promptFamiliarities: [],
      responses: [],
      usersPromptChoices: [],
      tips: [],
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
      const prompts = await supabase.from("prompts").select("*");
      this.prompts = prompts.data;
    },
    async getResponses() {
      const responses = await supabase.from("responses").select();
      this.responses = responses.data;
    },
    async getTips() {
      const tips = await supabase.from("tips").select();
      this.tips = tips.data;
    },
    async getEnum(rpcName){
      let { data, error } = await supabase
    .rpc(rpcName)
    console.log(error);
    return data;
    },
    async getPromptEnums(){
    this.promptAssociations = await this.getEnum("get_positivities");
    this.promptDifficulties = await this.getEnum("get_difficulties");
    this.promptFamiliarities = await this.getEnum("get_familiarities");
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
      this.getPromptEnums();
      this.getResponses();
      this.getTips();
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
    async submitPrompt(prompt){
      const sub = await supabase.from("prompts").insert(prompt);
      console.log(sub);
    },
    async updatePrompt(id,updatedData){
      try{
        const {data,error} = await supabase.from("prompts").update(updatedData).eq("id",id);
        console.log(data);
        console.log(error)
      } catch(err){
        console.log(err);
      }
      
    }
  },
  getters:{
  
  }
});
