<template>
    <div class="py-48">
        <h2 class="text-xl font-bold"> Thank you for your submission!</h2>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapActions } from 'pinia'

export default {
    props: {
        response: {
            type: String,
            default: ""
        },
    },
 
    data() {
        return {
            shareSettings: [{ name: "Keep Private", description: "You can always opt to share your response later if you change your mind. You can still share your responses with your friends and family on your private page if you want." }, { name: "Share with Storytellers", description: "Your words may be just the thing to jog another storyteller’s memory. Choose this option if you are okay with sharing this response with other storytellers in Fudeko email and letter correspondence. The response will not be made publicly available. Still, while we discourage storytellers from forwarding Fudeko emails outside the group, we cannot totally prevent it. Thank you for helping to build a creative and collaborative storytelling community!" }, { name: "Release with Creative Commons License", description: " <a class='blue-200' href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>(CC-BY-NC-SA 4.0 DEED)</a> Want to make this response publicly available for education or research? This license allows others to use, excerpt, or adapt your response as long as they 1) give proper attribution, 2) do not profit from it, and 3) release the resulting project under the same license. While a CC license cannot be retroactively revoked, we can remove the response(s) from our website. However, if they have been shared elsewhere, you will have to negotiate with those parties if you wish to have them taken down. If you have concerns/doubts, we encourage you to keep the response private or only share it with the group for now." }, { name: "Release Anonymously with Creative Commons License", description: "(CC-BY-NC-SA 4.0 DEED) Choose this to make this response anonymously available to the public for education or research purposes. While still released under the same CC license, proper attribution in this case is “by Anonymous, courtesy of the Fudeko Project.” If you decide you would like to be named with the response later, just email us at hana@fudekoproject.org and we will update the attribution information accordingly" }],
            difficulty: "",
            shareOption: "",
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['submitResponse'] ),
        // submit() {
        //     const bodyData = {
        //         response_text: this.response,
        //         participant: 2,
        //         prompt: promptID,
        //         user_title: this.userTitle,
        //         share_option: this.shareOption.name,
        //         response_difficulty: this.difficulty,
        //     }
        //     this.submitResponse( { response: this.response, difficulty: this.difficulty, shareOption: this.shareOption } )
        //     this.$router.push( { name: 'Form' } )
        // },
        backEdit() {
            this.$router.push( { name: 'ResponseForm' } )
        },
    },
}
</script>

<style lang="scss" scoped></style>