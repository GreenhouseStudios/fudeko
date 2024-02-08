<template>
    <div id="response-write" class="z-0 py-48 md:px-24">

        <span class="p-3 mx-auto md:px-5 md:w-2/3 md:p-5 prompt " v-if="activePrompt">
            <span class="flex flex-col mx-auto md:w-1/3 prompt-write-header">
                <p class="text-lg font-bold" v-html="activePrompt.prompt_text"></p>
                <p class="pt-1 text-sm font-bold" v-html="activePrompt.prompt_subtext"></p>
                <!-- <p v-if="previewing" class="mt-5 font-medium">Please confirm your submission text:</p> -->

            </span>

            <span>
                <div class="relative">
                    <div v-if="custom">
                        <label for="custom-prompt-title">Entry Title: </label>
                        <input type="text" id="custom-prompt-title" placeholder="Title (optional)" class="p-1 w-100"
                            size="75" v-model="userTitle">
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
                        <!-- <button @click="back"
                            class="p-2 font-bold bg-yellow-300 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button> -->
                        <!-- <button :class="{ 'opacity-25 cursor-not-allowed': response.length <= 0 }" @click="preview"
                            :disabled="response.length <= 0"
                            class="p-2 font-bold bg-yellow-300 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Next</button> -->
                    </span>
                    <span class="absolute bottom-1 right-1">Char: {{ responseCharCount }} Word: {{ responseWordCount
                    }}</span>
                </div>


                <div>
                    <FeedbackDifficulty :difficulty.sync="difficulty" />
                    <div class="flex flex-col items-start my-5" id="share-options-container">
                        <h2 class="font-bold">Would you like to publish this response?</h2>
                        <div class="flex" id="sharing-options">

                            <span class="flex flex-wrap items-center justify-center gap-2 mt-2 mb-5 mr-5 align-middle">
                                <button @click="shareOption = option" v-for="option in shareSettings" :key="option.name"
                                    class="z-10 w-48 h-24 p-2 border-2 rounded-md"
                                    :class="option === shareOption ? 'bg-yellow-300 border-gray-600 font-bold border-2' : 'border-yellow-300 hover:bg-yellow-200'">{{
                                        option.name }}</button>
                            </span>

                        </div>
                        <i class="mx-auto md:w-1/2" v-html="shareOption.description"></i>
                    </div>

                    <div class="flex justify-end gap-4 mt-5">
                        <!-- <button @click="backEdit"
                class="p-2 font-bold bg-yellow-200 border-2 border-yellow-300 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button> -->

                        <button @click="submit" :disabled="submitButtonDisabled"
                            class="p-2 font-bold rounded "
                            :class="submitButtonDisabled ? 'bg-gray-300 border-2 border-gray-400' : 'hover:bg-yellow-200 border-yellow-400 bg-yellow-300 border-2 '">Send</button>

                    </div>
                </div>
            </span>
        </span>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import WritingTip from './WritingTip.vue'
import FeedbackDifficulty from '@/components/FeedbackDifficulty.vue'
// import Confirmation from './Confirmation.vue'
import Editor from 'primevue/editor'
export default {
    components: {
        WritingTip,
        Editor,
        FeedbackDifficulty
    },
    data() {
        return {
            response: "",
            userTitle: "",
            shareSettings: [{ name: "Keep Private", description: "You can always opt to share your response later if you change your mind. You can still share your responses with your friends and family on your private page if you want." }, { name: "Share with Storytellers", description: "Your words may be just the thing to jog another storyteller’s memory. Choose this option if you are okay with sharing this response with other storytellers in Fudeko email and letter correspondence. The response will not be made publicly available. Still, while we discourage storytellers from forwarding Fudeko emails outside the group, we cannot totally prevent it. Thank you for helping to build a creative and collaborative storytelling community!" }, { name: "Release with Creative Commons License", description: " <a class='blue-200' href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>(CC-BY-NC-SA 4.0 DEED)</a> Want to make this response publicly available for education or research? This license allows others to use, excerpt, or adapt your response as long as they 1) give proper attribution, 2) do not profit from it, and 3) release the resulting project under the same license. While a CC license cannot be retroactively revoked, we can remove the response(s) from our website. However, if they have been shared elsewhere, you will have to negotiate with those parties if you wish to have them taken down. If you have concerns/doubts, we encourage you to keep the response private or only share it with the group for now." }, { name: "Release Anonymously with Creative Commons License", description: "(CC-BY-NC-SA 4.0 DEED) Choose this to make this response anonymously available to the public for education or research purposes. While still released under the same CC license, proper attribution in this case is “by Anonymous, courtesy of the Fudeko Project.” If you decide you would like to be named with the response later, just email us at hana@fudekoproject.org and we will update the attribution information accordingly" }],
            difficulty: "",
            shareOption: "",
        }
    },
    async mounted() {
        if ( this.$route.params.email && this.$route.params.promptNumber ) {
            this.user = this.$route.params.email;
            const participantRecord = this.participants.find( p => p.email == this.user );
            if ( participantRecord ) {
                this.setParticipantID( participantRecord.id );
            }
            if ( this.usersPromptChoices.length < 1 ) {
                this.toggleLoading()
                await this.getUserPrompts( this.user );
                this.toggleLoading()
            }
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['submitUserResponse', 'toggleLoading', 'getUserPrompts', 'setParticipantID'] ),
        preview() {
            this.previewing = true;
        },
        back() {
            this.previewing = false;
        },
        addFile( e ) {
            this.file = e.target.files[0]
        },
        async submit() {
            this.toggleLoading();
            const bodyData = {
                response_text: this.response,
                participant: this.participantID,
                prompt: this.custom ? 0 : this.activePrompt.id,
                user_title: this.userTitle,
                share_option: this.shareOption.name,
                response_difficulty: this.difficulty,
            };
            await this.submitUserResponse( bodyData )
            this.toggleLoading();
            this.$router.push( { name: 'ConfirmSubmit' } )
        },

    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['loading', 'error', 'usersPromptChoices', 'responses', 'tips', 'participants', 'participantID'] ),
        submitButtonDisabled() {
          return (this.shareOption.description == "" || this.response == "" || !this.shareOption.name)
        },
        custom() {
            return this.$route.path.includes( 'custom' )
        },
        responseCharCount() {
            return this.response.length
        },
        responseWordCount() {
            return this.response.split( ' ' ).length
        },

        activePrompt() {
            if ( this.$route.params.promptNumber && this.usersPromptChoices.length > 0) {
                const promptNumber = parseInt( this.$route.params.promptNumber )
                console.log( promptNumber )
                return this.usersPromptChoices[promptNumber - 1]
            }
            if ( this.custom ) {
                return { prompt_text: "Custom Prompt" }
            }
            if( this.$route.params.id ) {
                return this.usersPromptChoices.find( p => p.id == parseInt(this.$route.params.id) )
            }
            return null;
        },
        promptID() {
            return parseInt( this.$route.params.id )
        },
        numberOfResponses() {
            return this.responses.filter( r => r.participant == this.participantID ).length
        },
        currentTip() {
            return this.tips[this.numberOfResponses].tip_text
        },
    },

}
</script>

<style lang="scss" scoped></style>