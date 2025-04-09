import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";
import { useLocalStorage } from "@vueuse/core";
import { createClient } from "@supabase/supabase-js";
const supabaseAdmin = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_KEY
);
export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      user: null,
      loading: false,
      error: false,
      userLoggedIn: false,
      greetings: [],
      participantID: useLocalStorage("participantID", 0),
      participantRecord: null,
      loggedInUser: null,
      participants: [],
      prompts: useLocalStorage("prompts", []),
      promptDifficulties: useLocalStorage("promptDifficulties", []),
      promptAssociations: useLocalStorage("promptAssociations", []),
      promptFamiliarities: useLocalStorage("promptFamiliarities", []),
      responses: [],
      usersPromptChoices: [],
      tips: [],
      emails: [],
      partialResponse: useLocalStorage("partialResponse", {}),
      sbAdmin: supabaseAdmin,
    };
  },
  persist: {
    storage: sessionStorage,
  },
  actions: {
    async submitUserResponse(bodyData) {
      for (const file of bodyData.files) {
        const { data, error } = await supabaseAdmin.storage
          .from("response-media")
          .upload(
            "public/" +
              bodyData.participant +
              "/" +
              bodyData.prompt +
              "/" +
              file.name.trim().replace(/\s/g, "-"),
            file
          );
        bodyData.media.push(data.id);
        if (error) {
          console.error(error);
        }
      }
      bodyData.files = undefined;
      await supabase
        .from("responses")
        .insert(bodyData)
        .then((res) => {
          console.log(res);
        });
    },
    async submitRecord(tableName, bodyData) {
      await supabase
        .from(tableName)
        .insert(bodyData)
        .then((res) => {
          console.log(res);
        });
    },
    async deleteRecord(tableName, id) {
      await supabase
        .from(tableName)
        .delete()
        .eq("id", id)
        .then((res) => {
          console.log(res);
        });
    },
    async submitGreetings(bodyData) {
      await supabase
        .from("greetings")
        .insert(bodyData)
        .then((res) => {
          console.log(res);
        });
    },
    setParticipantID(value) {
      this.participantID = value;
    },
    async getParticipantRecord(id) {
      // this.participantRecord = await supabase.from("participants").select().eq("id", id).data;
      const rec = await supabase.from("participants").select().eq("id", id);
      this.participantRecord = rec.data[0];
    },
    recordPartialResponse(value) {
      this.partialResponse = value;
    },
    clearPartialResponse() {
      this.partialResponse = null;
    },
    async updateResponse(response) {
      await supabase.from("responses").update(response).eq("id", response.id);
    },
    async login(email, password) {
      await supabase.auth
        .signInWithPassword({ email: email, password: password })
        .then((res) => {
          console.log(res);
          this.userLoggedIn = true;
          if (res.error) {
            console.log(res.error);
            this.userLoggedIn = false;
          }
        }).
        catch((err) => {
          console.log(err);
        });
      const rec = await supabase
        .from("participants")
        .select()
        .eq("email", email);
      this.participantRecord = rec.data[0];
      this.setParticipantID(this.participantRecord.id);
      await this.getUserPrompts(email);
      await this.getUserResponses(email);
    },
    async getUserResponses() {
      const responses = await supabase
        .from("responses")
        .select()
      this.responses = responses.data; 
      console.log(this.responses)
    },
    async setPassword(value) {
      await this.sbAdmin.auth
        .signUp({
          email: value.email,
          password: value.password,
          options: {
            data: {},
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    async getParticipantRecordByEmail(email) {
      const rec = await supabase
        .from("participants")
        .select()
        .eq("email", email);
      this.participantRecord = rec.data[0];
      this.setParticipantID(this.participantRecord.id);
      await this.getUserPrompts(email);
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
      this.partialResponse = {};
      this.participantRecord = null;
    },
    setPrompts(value) {
      this.prompts = value;
    },
    async getPrompts() {
      const prompts = await supabase
        .from("prompts")
        .select("*")
        .eq("prompt_set", "fudeko");
      this.prompts = prompts.data;
    },
    async editGreeting(bodydata) {
      await supabase.from("greetings").update(bodydata).eq("id", bodydata.id);
    },
    async getResponses() {
      const responses = await supabase.from("responses").select();
      this.responses = responses.data;
    },
    async getGreetings() {
      const greetings = await supabase.from("greetings").select();
      this.greetings = greetings.data;
    },
    async getEmails() {
      const emails = await supabase.from("emails").select();
      this.emails = emails.data;
    },
    async getTips() {
      const tips = await supabase
        .from("tips")
        .select()
        .order("week", { ascending: true });
      this.tips = tips.data;
    },
    async verifyUserExists(email) {
      const { data, error } = await supabase
        .from("participants")
        .select()
        .eq("email", email);
      if (error) {
        console.error(error);
      }
      return data;
    },
    async getEnum(rpcName) {
      let { data } = await supabase.rpc(rpcName);
      return data;
    },
    async getPromptEnums() {
      this.promptAssociations = await this.getEnum("get_positivities");
      this.promptDifficulties = await this.getEnum("get_difficulties");
      this.promptFamiliarities = await this.getEnum("get_familiarities");
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
    toggleError(err) {
      console.log(err);
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
      await this.getGreetings();
      await this.getEmails();
      if (this.participantID) {
        await this.getParticipantRecord(this.participantID);
        await this.getUserResponses();
      }
    },
    async participantHasUnansweredSets(participantID) {
      const { data } = await supabase.rpc("has_unanswered_sets", {
        participant_id: participantID,
      });
      return data;
    },
    async getUserPrompts(userEmail) {
      console.log(userEmail);
      if (this.participantID) {
        const prompts = await supabase.rpc("get_latest_prompt_set", {
          user_id: this.participantID,
        });
        this.usersPromptChoices = prompts.data;
      }
    },
    async submitPrompt(prompt) {
      const sub = await supabase.from("prompts").insert(prompt);
      console.log(sub);
    },
    async updatePrompt(id, updatedData) {
      try {
        const { data, error } = await supabase
          .from("prompts")
          .update(updatedData)
          .eq("id", id);
        console.log(data);
        console.log(error);
      } catch (err) {
        console.log(err);
      }
    },
    async AddNewParticipant(bodyData, password) {
      const res = await supabase.auth.signUp({
        email: bodyData.email,
        password: password,
      });

      if (res.error) {
        console.error(res.error);
        return;
      }

      const { data, error } = await supabase
        .from("participants")
        .insert(bodyData);

      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    },
    async AddNewTip(bodyData) {
      await supabase
        .from("tips")
        .insert(bodyData)
        .then((res) => {
          console.log(res);
        });
    },
    async AddNewEmail(bodyData) {
      await supabase
        .from("emails")
        .insert(bodyData)
        .then((res) => {
          console.log(res);
        });
    }
  },
  getters: {
    // getPrompts: (state) => {
    //   return state.prompts;
    // },
    // getPromptAssociations: (state) => {
    //   return state.promptAssociations;
    // },
    // getPromptDifficulties: (state) => {
    //   return state.promptDifficulties;
    // },
    // getPromptFamiliarities: (state) => {
    //   return state.promptFamiliarities;
    // },
    // getParticipantID: (state) => {
    //   return state.participantID;
    // },
    getActiveParticipants: (state) => {
      return state.participants.filter((participant) => participant.status === "active");
    }
  },
});
