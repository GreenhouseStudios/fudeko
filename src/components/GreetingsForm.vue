<template>

    <span>
        <h1 class="text-2xl font-bold m-5">Greeting Submission Form</h1>
        <h1 class="m-2 text-xl">Greeting Title</h1>
        <input v-model='greetingTitle' type="text"  class="border-2 p-1" style="width: 250px" placeholder="Enter Greeting Title Here">
        <br>
        <br>
            <h1 class="m-2 text-xl">Greeting Text</h1>
            <Editor class=" bg-white text-center m-auto" v-model="greeting" style="height: 320px; max-width: 600px"
                placeholder="Type your response here"></Editor>

        <div class="my-20">
                    <button @click="submit" :disabled="submitButtonDisabled" class="p-2 font-bold rounded "
                    :class="submitButtonDisabled ? 'bg-gray-300 border-2 border-gray-400' : 'hover:bg-yellow-200 border-yellow-400 bg-yellow-300 border-2 '">Submit</button>
        </div>
    </span>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapStores, mapActions } from 'pinia'
import Editor from 'primevue/editor'

export default {
components: {
Editor,
},
data() {
return {
    greeting: "",
    greetingTitle: ''
}
},
async mounted() {

},
methods: {
...mapActions( useCounterStore, ['submitGreetings', 'toggleLoading'] ),
async submit() {
    if ( this.submitButtonDisabled ) return;
    this.toggleLoading();
    await this.submitGreetings( this.formData )
    this.toggleLoading();
    this.$router.push( { name: 'ConfirmSubmit' } )
},

},
computed: {
...mapStores( useCounterStore ),
submitButtonDisabled() {
    return this.greeting.length < 1 || this.greetingTitle.length <1
},
formData() {
    return {
        text: this.greeting.replaceAll(`"`,`\\"`),
        title: `<p>${this.greetingTitle.replaceAll(`"`,`\\"`)}</p>`,
    }
},
},

}
</script>

<style lang="scss" scoped>
</style>