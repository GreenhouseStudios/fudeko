<template>
  <div class="container relative px-4 md:px-8 md:w-full">
    <h1 class="text-3xl font-bold text-center">Fudeko Prompt Form</h1>
    <br />
    <div v-if="error">
      <h2>The user you requested does not exist.</h2>
    </div>

    <br />
    <div v-if="userVerified && !loading">
      <div v-if="!submitted && usersPromptChoices && !userCaughtUp">
        <div class="" v-if="!previewing">
          <span v-if="!activePrompt && questionsNotToAsk.length < 3 && !preselectedPromptNumber"
            id="prompt-choose-container" class="mb-10">
            <PromptList prompts="randomizedPrompts"></PromptList>
          </span>
          <span id="custom-prompt-btn-container" v-if="!activePrompt && !preselectedPromptNumber"
            class="flex justify-center">
            <button @click="useCustomPrompt"
              class="p-5 px-3 mt-3 bg-yellow-200 border-2 border-yellow-400 rounded shadow-md animate__animated animate__fadeIn hover:bg-yellow-100">Use
              Custom
              Prompt</button>
          </span>
        </div>

        <div v-if="activePrompt || preselectedPromptNumber" id="response-write" class="z-0">

          <span class="p-3 mx-auto md:px-5 md:w-2/3 md:p-5 prompt ">
            <span class="flex flex-col prompt-write-header">
              <p class="text-lg font-bold">{{ activePrompt.prompt_text }}</p>
              <p v-if="previewing" class="mt-5 font-medium">Please confirm your submission text:</p>

            </span>

            <span>
              <div v-if="!previewing" class="relative">
                <div v-if="custom">
                  <label for="custom-prompt-title">Entry Title: </label>
                  <input type="text" id="custom-prompt-title" placeholder="Title (optional)" class="p-1 w-100" size="75"
                    v-model="userTitle">
                </div>
                <Editor class="my-10 bg-white" v-model="response" style="height: 320px"
                  placeholder="Type your response here"></Editor>


                <WritingTip :tip="currentTip"></WritingTip>

                <!-- <div class="my-5">

                  <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" v-on:change="addFile" />
                  <button @click="onUpload"
                    class="block p-1 my-3 border-2 border-yellow-300 rounded hover:bg-yellow-300">Upload</button>
                </div> -->


                <span class="flex justify-center gap-5 mt-24 text-white">
                  <button @click="back"
                    class="p-2 font-bold bg-yellow-300 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button>
                  <button :class="{ 'opacity-25 cursor-not-allowed': response.length <= 0 }" @click="preview"
                    :disabled="response.length <= 0"
                    class="p-2 font-bold bg-yellow-300 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Next</button>
                </span>
                <span class="absolute bottom-1 right-1">Char: {{ responseCharCount }} Word: {{ responseWordCount }}</span>
              </div>


              <div v-else>
               <Confirmation :response="response"></Confirmation>
              </div>
            </span>
          </span>
        </div>
      </div>
      <div class="text-center complete" v-if="submitted">
        <h2>Thanks for your submission! :)</h2>
      </div>
      <div v-if="!activePrompt && questionsNotToAsk.length > 2" class="my-5">
        <h2>It looks like none of this week's questions worked out for you. We're sorry to hear that.</h2>
        <br>
        <h2>If you wish to write with questions or suggestions please contact <a class="text-blue-500"
            href="hana@fudekoproject.org">hana@fudekoproject.org</a></h2>
      </div>
      <div v-if="questionsNotToAsk.length == 0 && usersPromptChoices.length < 1">
        <h2>You are all caught up with your prompts, please check back later!</h2>
      </div>

    </div>
  </div>
</template>

<script>
import FeedbackDifficulty from './FeedbackDifficulty.vue'
import PromptList from './PromptList.vue'
import { supabase } from '../lib/supabaseClient'
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import Editor from 'primevue/editor';
import Confirmation from './Confirmation.vue'
import WritingTip from './WritingTip.vue'
import { defineComponent } from 'vue';
export default defineComponent( {
  data() {
    return {
      response: "",
      
      activePrompt: null,
      user: "",
      userVerified: true,
      submitted: false,
      previewing: false,
      custom: false,
      userTitle: "",
      shareOption: "",
      
      questionsNotToAsk: [],
      files: []
    };
  },
  async created() {
    this.toggleLoading();
    console.log('check user')
    if ( this.$route.params.email ) {
      this.user = this.$route.params.email;
      this.getUserPrompts( this.user );
    }
    this.toggleLoading();
  },
  methods: {

    ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'getUserPrompts'] ),
    addFile( e ) {
      this.files.push( e.target.files[0] )
      console.log( e.target.files[0] )
    },

    async onUpload() {
      this.toggleLoading();
      const { data, error } = await supabase
        .storage
        .from( 'response-images' )
        .upload( 'public/' + this.files[0].name, this.files[0], {
          cacheControl: '3600',
          upsert: false
        } ).then( ( res ) => {
          console.log( res )
          this.files = [];
        } ).catch( ( err ) => {
          console.log( err )
        } )
      console.log( data );
      console.log( error );
    },
    DoNotAsk( prompt ) {
      if ( confirm( "We will not ask you this question again in the future. Are you sure?" ) ) {
        console.log( "remove " + prompt.promptText );
        this.questionsNotToAsk.push( prompt.promptNumber );
        // this.prompts = this.prompts.filter( p => p.promptText !== prompt.promptText );
        supabase.rpc( 'create_decline', { prompt_id_value: prompt.id, participant_id_value: this.userRecord.id } ).then( ( res ) => {
          console.log( res )
        } )
      }
    },
    useCustomPrompt() {
      this.custom = true;
      this.activePrompt = "custom";
    },
    setActivePrompt( p ) {
      this.activePrompt = p;
    },
    preview() {
      this.previewing = true;
    },
    back() {
      this.custom = false;
      this.previewing = false;
      this.activePrompt = null;
    },
    backEdit() {
      this.previewing = false;
    },
    async submit() {
      this.toggleLoading();

      const bodyData = {
        response_text: this.response,
        participant: 2,
        prompt: this.custom ? 0 : this.activePrompt.id,
        user_title: this.userTitle,
        share_option: this.shareOption.name,
        response_difficulty: this.difficulty,
      };

      const { error } = supabase
        .from( 'responses' )
        .insert( bodyData ).then( ( res ) => {
          console.log( res, error )
          this.submitted = true;
          this.toggleLoading();
        } )
    },
  },
  computed: {
    ...mapStores( useCounterStore ),
    ...mapState( useCounterStore, ['count', 'prompts', 'loading', 'error', 'usersPromptChoices', 'participants', 'responses', 'tips'] ),
    userRecord(){
      return this.participants.find( p => p.email == this.user )
    },
    randomizedPrompts() {
      return this.usersPromptChoices.map( value => ( { value, sort: Math.random() } ) )
        .sort( ( a, b ) => a.sort - b.sort )
        .map( ( { value } ) => value );
    },
    responseWordCount() {
      return this.response.trim().split( " " ).length;
    },
    responseCharCount() {
      return this.response.length;
    },
    userCaughtUp() {
      return this.usersPromptChoices.length < 1;
    },
  
    preselectedPromptNumber() {
      if ( this.$route.params.promptNumber ) {
        this.activePrompt = this.usersPromptChoices[parseInt( this.$route.params.promptNumber ) - 1]
        return parseInt( this.$route.params.promptNumber )
      }
      else {
        return null
      }
    },
    participantID() {
      return this.participants.find( p => p.email == this.$route.params.email ).id
    },
    numberOfResponses() {
      return this.responses.filter( r => r.participant == this.participantID ).length
    },
    currentTip(){
      return this.tips[this.numberOfResponses].tip_text
    },
  },
  components: { FeedbackDifficulty, Editor, PromptList, Confirmation, WritingTip}
} );
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
}

.prompt-header {}

.prompt-response {
  margin: 20px;
  width: 90%;
  border: none;
}
button {
  background-color: #F66118;
}

.prompt {
  display: block;
  justify-content: space-between;
  border: 2px solid rgb(255, 218, 150);
  border-radius: 5px;
  background-color: rgb(252, 241, 220);



  p {
    display: inline;
    margin-right: 10px;
  }
}

.preview-text {
  font-family: Georgia, 'Times New Roman', Times, serif;
}

#sharing-options {}
</style>