import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";


export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      user: null,
      loading: false,
      error: false,
      participantID: null,
      participantRecord: null,
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
    async submitUserResponse(bodyData){
        await supabase
        .from( 'responses' )
        .insert( bodyData ).then( ( res ) => {
          console.log( res )
        } )
    },
    setParticipantID(value) {
      this.participantID = value;
    },
    async getParticipantRecord(id) {
      this.participantRecord = await supabase.from("participants").select().eq("id", id);
    },
    async login(value) {

      console.log("logging in")
      const rec = await supabase.from("participants").select().eq("email", value);
      this.participantRecord = rec.data[0];
      this.setParticipantID(this.participantRecord.id);
      await this.getUserPrompts(value);
    },
    loginAdmin(value) {
      this.user = value;
 
      this.participantRecord = null;
    },
    async fetchAdminData() {
      await this.getParticipants();
      await this.getResponses();
    },
    logout() {  
      this.user = null;
    },
    setPrompts(value) {
      this.prompts = value;
    },
    async getPrompts() {
      const prompts = await supabase.from("prompts").select("*").eq("prompt_set","fudeko")
      this.prompts = prompts.data;
    },
    async getResponses() {
      const responses = await supabase.from("responses").select();
      this.responses = responses.data;
    },
    async getTips() {
      const tips = await supabase.from("tips").select().order('week', { ascending: true });
      this.tips = tips.data;
    },
    async verifyUserExists(email) {
      const { data, error } = await supabase.from("participants").select().eq("email", email);
      if (error) {
        console.error(error);
      }
      return data;
    },
    async getEnum(rpcName){
      let { data  } = await supabase
    .rpc(rpcName)
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
    async initializeStore() {
      await this.getPrompts();
      await this.getPromptEnums();
      await this.getTips();
    },
    async participantHasUnansweredSets(participantID) {
      const {data} = await supabase.rpc('has_unanswered_sets', {participant_id: participantID});
      return data;
    },
    async getUserPrompts(userEmail) {
      console.log(userEmail);
      if(this.participantID) {
        const prompts = await supabase.rpc('get_latest_prompt_set', {user_id: this.participantID})
        this.usersPromptChoices = prompts.data;
      }
     
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
