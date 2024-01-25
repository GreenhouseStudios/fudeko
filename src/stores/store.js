import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";


export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      user: null,
      loading: false,
      error: false,
      participantID: null,
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
      await this.getParticipants();
      await this.getPrompts();
      await this.getPromptEnums();
      await this.getResponses();
      await this.getTips();
    },
    async getUserPrompts(userEmail) {
      const userID = this.participants.find((p) => p.email === userEmail)?.id;
      console.log(this.participants);
      console.log(userEmail)
      console.log(userID)


      if(userID) {
        //Get latest three outbounds
        const outs = await supabase.rpc('get_latest_outbound_set', {user_id: userID})
        this.outbounds = outs.data;
  
        if(this.outbounds){
          for(var i = 0; i < this.outbounds.length; i++){
            this.usersPromptChoices.push(this.prompts.find((p) => p.id === this.outbounds[i].prompt));
           }
        }
        else{
          console.error("No outbounds found for user " + userID)
        }
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
