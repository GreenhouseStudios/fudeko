<template>
    <div id="response-write" class="z-0 py-32 md:px-24" v-if="participantRecord || isAdminRoute">

        <span class="p-3 mx-auto md:px-5 md:w-2/3 md:p-5 prompt " v-if="hasUnansweredSets">
            <span class="flex flex-col mx-auto md:w-1/2 prompt-write-header" v-if="!isAdminRoute">
                <h2 class="pb-3 text-4xl" v-html="activePrompt.prompt_text"></h2>
                <h3 class="pt-1 text-lg font-bold" v-html="activePrompt.prompt_subtext"></h3>
            </span>

            <span>
                <div class="relative">
                    <div v-if="custom">
                        <label for="custom-prompt-title">Entry Title: </label>
                        <input type="text" id="custom-prompt-title" placeholder="Title (optional)" class="p-1 w-100"
                            size="75" v-model="userTitle">
                    </div>


                    <div v-if="isAdminRoute">
                        <h1 class="m-10 text-xl">Admin: Enter Response for Participant</h1>
                        <div class="my-10"><label for="participant-select" class="mr-5">Select Participant</label>
                            <Dropdown id="participant-select" v-model="adminParticipant" :options="participants"
                                optionLabel="last_name"></Dropdown>
                        </div>
                        <div class="my-10">
                            <label for="select-prompt" class="mr-5">Select Prompt</label>
                            <Dropdown id="select-prompt" v-model="adminPrompt" :options="prompts" optionLabel="prompt_text">
                            </Dropdown>
                        </div>
                        <h2 class="m-2">
                            {{ adminPrompt?.prompt_text }}

                        </h2>
                        <p>{{ adminPrompt?.prompt_subtext }}</p>
                    </div>

                    <Editor class="my-10 bg-white" v-model="response" style="height: 320px"
                        placeholder="Type your response here"></Editor>

                    <WritingTip :tip="currentTip" v-if="!isAdminRoute"></WritingTip>
                </div>

                <div class="py-12">
                    <div class="flex flex-col justify-start w-1/4" id="feedback-container">
                        <label for="feedback" class="mx-2 font-bold">How difficult was this to answer?</label>
                        <Dropdown v-model="difficulty" :options="difficultyOptions" class="m-2"></Dropdown>
                    </div>

                    <div class="flex flex-col items-start my-5" id="share-options-container">
                        <h2 class="font-bold">Would you like to publish this response?</h2>
                        <div class="flex" id="sharing-options">

                            <span class="flex flex-wrap items-center justify-center gap-2 my-2 mr-5 align-middle">
                                <button @click="shareOption = option" v-for="option in shareSettings" :key="option.name"
                                    class="z-10 w-48 h-24 p-2 border-2 rounded-md"
                                    :class="option === shareOption ? 'bg-yellow-300 border-gray-600 font-bold border-2' : 'border-yellow-300 hover:bg-yellow-200'">{{
                                        option.name }}</button>
                            </span>

                        </div>


                        <i class="mx-auto my-5 md:w-full" v-html="shareOption.description"></i>

                        <div v-if="shareOption && shareOption.name != 'Keep Private'">
                            <span class="flex flex-wrap items-center justify-center gap-2 mt-2 mb-5 mr-5 align-middle">
                                <button @click="attrOption = option" v-for="option in attrSettings" :key="option.name"
                                    class="z-10 w-48 h-24 p-2 border-2 rounded-md"
                                    :class="option === attrOption ? 'bg-yellow-300 border-gray-600 font-bold border-2' : 'border-yellow-300 hover:bg-yellow-200'">{{
                                        option.description }}</button></span>


                            <div v-if="attrOption.name == 'CreditWithGivenName'" class="flex justify-start"> You will be
                                credited as {{
                                    participantRecord.first_name + ' ' + participantRecord.last_name }}</div>
                            <div v-if="attrOption.name == 'CreditDifferent'" class="flex justify-start">
                                <label for="alt-credit" class="mr-2">Enter name to be credited as:</label>
                                <input id="alt-credit" type="text" v-model="creditName" class="p-2 border-2 rounded-md">
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-4 mt-5">

                        <button @click="submit" :disabled="submitButtonDisabled" class="p-2 font-bold rounded "
                            :class="submitButtonDisabled ? 'bg-gray-300 border-2 border-gray-400' : 'hover:bg-yellow-200 border-yellow-400 bg-yellow-300 border-2 '">Send</button>

                    </div>
                </div>
            </span>
        </span>
        <span v-else>
            <div class="w-1/3 p-12 mx-auto bg-yellow-200 border-2 border-yellow-400">
                <h1>You are caught up with your prompts! Please check again later for next week's prompts.</h1>
            </div>
        </span>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import WritingTip from '@/components/WritingTip.vue'
// import FeedbackDifficulty from '@/components/FeedbackDifficulty.vue'
// import Confirmation from './Confirmation.vue'
import Editor from 'primevue/editor'
import Dropdown from 'primevue/dropdown'

const shareSettingsArray = [{ name: "Keep Private", description: "You can always opt to share your response later if you change your mind. You can still share your responses with your friends and family on your private page if you want." }, { name: "Share with Storytellers", description: "Your words may be just the thing to jog another storyteller’s memory. Choose this option if you are okay with sharing this response with other storytellers in Fudeko email and letter correspondence. The response will not be made publicly available. Still, while we discourage storytellers from forwarding Fudeko emails outside the group, we cannot totally prevent it. Thank you for helping to build a creative and collaborative storytelling community!" }, { name: "Release with Creative Commons License", description: " <a class='blue-200' href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>(CC-BY-NC-SA 4.0 DEED)</a> Want to make this response publicly available for education or research? This license allows others to use, excerpt, or adapt your response as long as they 1) give proper attribution, 2) do not profit from it, and 3) release the resulting project under the same license. While a CC license cannot be retroactively revoked, we can remove the response(s) from our website. However, if they have been shared elsewhere, you will have to negotiate with those parties if you wish to have them taken down. If you have concerns/doubts, we encourage you to keep the response private or only share it with the group for now." }];
export default {
    components: {
        WritingTip,
        Editor,
        Dropdown
    },
    data() {
        return {
            response: "",
            userTitle: "",
            shareSettings: shareSettingsArray,
            attrSettings: [{ name: "RemainAnonymous", description: "Remain Anonymous" }, { name: "CreditWithGivenName", description: "Credit me as my registered name" }, { name: "CreditDifferent", description: "Credit me as a different name" },],
            difficulty: "",
            attrOption: "",
            shareOption: shareSettingsArray[0],
            hasUnansweredSets: true,
            creditName: "",
            difficultyOptions: ["Easy", "Moderate", "Somewhat Difficult", "Difficult"],
            adminPrompt: null,
            adminParticipant: null,
        }
    },
    async mounted() {
        if ( this.$route.params.email ) {
            console.log( 'mounted email' )
            if ( !this.participantRecord )
                await this.login( this.$route.params.email );
            if ( await this.participantHasUnansweredSets( this.participantRecord.id ) )
                await this.getUserPrompts( this.user );
            else this.hasUnansweredSet = false;
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['submitUserResponse', 'toggleLoading', 'getUserPrompts', 'setParticipantID', 'participantHasUnansweredSets', 'login'] ),
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
            if ( this.submitButtonDisabled ) return;
            this.toggleLoading();
            await this.submitUserResponse( this.formData )
            this.toggleLoading();
            this.$router.push( { name: 'ConfirmSubmit' } )
        },

    },
    computed: {
        ...mapStores( useCounterStore ),
        ...mapState( useCounterStore, ['loading', 'error', 'usersPromptChoices', 'tips', 'participantID', 'participantRecord', 'prompts', 'participants'] ),
        submitButtonDisabled() {
            return this.response.length < 1 || !this.shareOption || this.shareOption.name != "Keep Private" && !this.attrOption
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
        formData() {
            return {
                response_text: this.response,
                participant: this.adminParticipant?.id || this.participantID,
                prompt: this.adminPrompt?.id || this.activePrompt?.id,
                user_title: this.userTitle,
                share_option: this.shareOption.name,
                response_difficulty: this.difficulty,
                attribution_option: this.attrOption.name,
                attribution_name: this.attrOption.name == "CreditDifferent" ? this.creditName : null,
                entered_by_admin: this.adminPrompt ? true : false,
            }
        },
        activePrompt() {
            if ( this.isAdminRoute ) {
                return this.prompts[0]
            }
            if ( this.$route.params.promptNumber && this.usersPromptChoices.length > 0 ) {
                const promptNumber = parseInt( this.$route.params.promptNumber )
                console.log( promptNumber )
                return this.usersPromptChoices[promptNumber - 1]
            }
            if ( this.custom ) {
                return { prompt_text: "Custom Prompt" }
            }
            if ( this.$route.params.id ) {
                return this.usersPromptChoices.find( p => p.id == parseInt( this.$route.params.id ) )
            }
            return null;
        },
        promptID() {
            return parseInt( this.$route.params.id )
        },
        numberOfResponses() {
            if ( this.isAdminRoute ) {
                return 0;
            }
            return this.participantRecord.number_answered_sets;
        },
        currentTip() {
            return this.tips[this.numberOfResponses % this.tips.length]
        },
        isAdminRoute() {
            return this.$route.path.includes( 'new' )
        }
    },

}
</script>

<style lang="scss" scoped></style>