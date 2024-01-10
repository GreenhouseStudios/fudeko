<template>
    <div>
        <!-- Confirmation Page -->
        <div class="w-5/6 p-10 mx-auto mt-2 mb-10 bg-yellow-50 preview-text" v-html="response"></div>
        <FeedbackDifficulty :difficulty.sync="difficulty" />
        <div class="flex flex-col items-start my-5" id="share-options-container">
            <h2 class="font-bold">Would you like to publish this response?</h2>
            <div class="flex" id="sharing-options">

                <span class="flex flex-wrap items-center justify-center gap-2 mt-2 mb-5 mr-5 align-middle">
                    <button @click="shareOption = option" v-for="option in shareSettings" :key="option.name"
                        class="z-10 w-48 h-24 p-2 border-2 rounded-md"
                        :class="option === shareOption ? 'bg-yellow-300 border-2 border-gray-600 font-bold border-2' : 'border-yellow-300 hover:bg-yellow-200'">{{
                            option.name }}</button>
                </span>

            </div>
            <i class="mx-auto md:w-1/2" v-html="shareOption.description"></i>
        </div>

        <div class="flex justify-end gap-4 mt-5">
            <button @click="backEdit"
                class="p-2 font-bold bg-yellow-200 border-2 border-yellow-300 rounded disabled:bg-yellow-50 disabled:border-0 hover:bg-yellow-100">Back</button>

            <button @click="submit" :disabled="submitButtonDisabled"
                class="p-2 font-bold bg-yellow-300 border-2 border-yellow-400 rounded disabled:bg-yellow-50 disabled:border-0"
                :class="submitButtonDisabled ? 'bg-yellow-50 border-yellow-100' : 'hover:bg-yellow-200'">Send</button>

        </div>
    </div>
</template>

<script>
import FeedbackDifficulty from '@/components/FeedbackDifficulty.vue'
export default {
    props: {
        response: {
            type: String,
            default: ""
        },
    },
    components: {
        FeedbackDifficulty
    },
    data() {
        return {
            shareSettings: [{ name: "Keep Private", description: "You can always opt to share your response later if you change your mind. You can still share your responses with your friends and family on your private page if you want." }, { name: "Share with Storytellers", description: "Your words may be just the thing to jog another storyteller’s memory. Choose this option if you are okay with sharing this response with other storytellers in Fudeko email and letter correspondence. The response will not be made publicly available. Still, while we discourage storytellers from forwarding Fudeko emails outside the group, we cannot totally prevent it. Thank you for helping to build a creative and collaborative storytelling community!" }, { name: "Release with Creative Commons License", description: " <a class='blue-200' href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>(CC-BY-NC-SA 4.0 DEED)</a> Want to make this response publicly available for education or research? This license allows others to use, excerpt, or adapt your response as long as they 1) give proper attribution, 2) do not profit from it, and 3) release the resulting project under the same license. While a CC license cannot be retroactively revoked, we can remove the response(s) from our website. However, if they have been shared elsewhere, you will have to negotiate with those parties if you wish to have them taken down. If you have concerns/doubts, we encourage you to keep the response private or only share it with the group for now." }, { name: "Release Anonymously with Creative Commons License", description: "(CC-BY-NC-SA 4.0 DEED) Choose this to make this response anonymously available to the public for education or research purposes. While still released under the same CC license, proper attribution in this case is “by Anonymous, courtesy of the Fudeko Project.” If you decide you would like to be named with the response later, just email us at hana@fudekoproject.org and we will update the attribution information accordingly" }],
            difficulty: "",
            shareOption: "",
        }
    },
    computed: {
        submitButtonDisabled() {
      return this.shareOption === ""
    },
    },
}
</script>

<style lang="scss" scoped></style>