<template>
  <div class="container relative px-4 py-36 md:px-8 md:w-full">
    <!-- <h1 class="text-3xl font-bold text-center">Fudeko Prompt Form</h1> -->

    <!-- <div v-if="error">
      <h2>The user you requested does not exist.</h2>
    </div> -->

    <div v-if="userVerified && !loading">
      <div>

        <div id="prompt-choose-container" class="mb-10">
          <PromptList :prompts="usersPromptChoices" :declinedPrompts="declinedPrompts"
            @set-active-prompt="(p) => activePrompt = p"></PromptList>
        </div>

        <span id="custom-prompt-btn-container" v-if="!activePrompt && !preselectedPromptNumber"
          class="flex justify-center">
          <button @click="useCustomPrompt"
            class="p-2 px-3 mt-3 bg-yellow-200 border-2 border-yellow-400 rounded shadow-md animate__animated animate__fadeIn hover:bg-yellow-100">Use
            Custom
            Prompt</button>
        </span>


        <!-- <div v-if="activePrompt">
          <ResponseForm :activePrompt="activePrompt" :preselectedPromptNumber="preselectedPromptNumber" :user="user">
          </ResponseForm>
        </div> -->

      </div>
      <!-- <div class="text-center complete" v-if="submitted">
        <h2>Thanks for your submission! :)</h2>
      </div> -->
      <!-- <div v-if="!activePrompt && declinedPrompts.length > 2" class="my-5">
          <h2>It looks like none of this week's questions worked out for you. We're sorry to hear that.</h2>
          <br>
          <h2>If you wish to write with questions or suggestions please contact <a class="text-blue-500"
              href="hana@fudekoproject.org">hana@fudekoproject.org</a></h2>
        </div> -->
      <!-- <div v-if="usersPromptChoices?.length < 1" class="flex h-screen">
        <div class="py-5 m-auto bg-yellow-400 rounded-sm md:w-1/2">
          <h2 class="font-bold">You are all caught up with your prompts, please check back later!</h2>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import FeedbackDifficulty from './FeedbackDifficulty.vue'
// import { supabase } from '../lib/supabaseClient'
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import { defineComponent } from 'vue';
import PromptList from './PromptList.vue'
import ResponseForm from './ResponseForm.vue'
export default defineComponent( {
  data() {
    return {
      // response: "",

      activePrompt: null,
      user: "",
      userVerified: false,
      // submitted: false,
      // previewing: false,
      custom: false,
      // userTitle: "",
      // shareOption: "",

      // declinedPrompts: [],
      // files: []
    };
  },
  async mounted() {
    // this.toggleLoading();

    if ( this.$route.params.email) {
      this.user = this.$route.params.email;
      const participantRecord = this.participants.find( p => p.email == this.user );
      if ( participantRecord ) {
        this.userVerified = true
        this.setParticipantID( participantRecord.id );
      }
      else {
        this.$router.push( { name: 'Home' } )
      }

      if(this.usersPromptChoices.length < 1)
      await this.getUserPrompts( this.user );
    }
    // this.toggleLoading();
  },

  methods: {

    ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'getUserPrompts', 'setParticipantID'] ),
    addFile( e ) {
      this.files.push( e.target.files[0] )
      console.log( e.target.files[0] )
    },

    // async onUpload() {
    //   this.toggleLoading();
    //   const { data, error } = await supabase
    //     .storage
    //     .from( 'response-images' )
    //     .upload( 'public/' + this.files[0].name, this.files[0], {
    //       cacheControl: '3600',
    //       upsert: false
    //     } ).then( ( res ) => {
    //       console.log( res )
    //       this.files = [];
    //       this.toggleLoading();
    //     } ).catch( ( err ) => {
    //       console.log( err )
    //     } )
    //   console.log( data );
    //   console.log( error );
    // },

    useCustomPrompt() {
      // this.custom = true;
      // this.activePrompt = "custom";
      this.$router.push( { name: 'ResponseFormCustom' } )
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
    // async submit() {
    //   this.toggleLoading();

    //   const bodyData = {
    //     response_text: this.response,
    //     participant: 2,
    //     prompt: this.custom ? 0 : this.activePrompt.id,
    //     user_title: this.userTitle,
    //     share_option: this.shareOption.name,
    //     response_difficulty: this.difficulty,
    //   };

    //   const { error } = supabase
    //     .from( 'responses' )
    //     .insert( bodyData ).then( ( res ) => {
    //       console.log( res, error )
    //       this.submitted = true;
    //       this.toggleLoading();
    //     } )
    // },
  },
  computed: {
    ...mapStores( useCounterStore ),
    ...mapState( useCounterStore, ['prompts', 'loading', 'error', 'usersPromptChoices', 'participants', 'responses', 'tips'] ),
    userRecord() {
      return this.participants.find( p => p.email == this.user )
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


  },
  components: { FeedbackDifficulty, PromptList, ResponseForm }
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
  // background-color: #F66118;
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