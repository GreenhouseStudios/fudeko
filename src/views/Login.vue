<template>
    <div class="flex justify-center ">
        <div class="">
            <sign-in-magic-link />
            <!-- <h1 class="text-2xl font-bold">Login</h1>
            <form class="flex flex-col">
                <div class="flex flex-col items-start w-full my-2">
                <label for="email">Email</label>
                <input id="email" type="text" v-model="email" class="border-2"/>
            </div>

                <div>
                    <Button v-if="!this.email" Button @click="loginUser" class="p-2 my-2 bg-gray-300 border-2 border-gray-400" disabled>Login</Button>
                    <Button v-else @click="loginUser" class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">Login</Button>
                </div>
            </form>
            <p id="error-message"></p> -->
        </div>
    </div>
</template>

<script>

// import InputText from 'primevue/inputtext';
// import Button from 'primevue/button'
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
import SignInMagicLink from '../components/SignInMagicLink.vue'
// import { store } from '../stores/store';
export default {
    data() {
        return {
            email: '',
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'login'] ),
        loginUser() {
            this.login( this.email )
            this.$router.push('/form/' + this.email)
        }
    },
    components: {
        // Button,
        SignInMagicLink
    },
    mounted() {

    },
    computed: {
        mapStores() {
            return mapStores( useCounterStore )
        },
        mapState() {
            return mapState( useCounterStore, ['count', 'prompts', 'user', 'loading', 'error'] )
        },
    },
}
</script>

<style lang="scss" scoped>
#email {
    width: 250px
}
</style>