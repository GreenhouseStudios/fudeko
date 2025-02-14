<template>
    <div class="flex justify-center h-screen py-24">
        <div class="">
            <!-- <sign-in-magic-link /> -->
            <h1 class="text-2xl font-bold">Login</h1>
            <form class="flex flex-col">
                <div class="flex flex-col items-start w-full my-2">
                <FormKit id="email" type="text" validation="required|email" v-model="email" class="border-2" label="Email"/>
                <FormKit id="password" v-model="password" validation="required" type="password" class="border-2" label="Password"/>
            </div>

                <div>
                    <Button v-if="!this.email" @click="loginUser" class="p-2 my-2 bg-gray-300 border-2 border-gray-400" disabled>Login</Button>
                    <Button v-else @click.prevent="loginUser" class="p-2 my-2 bg-yellow-300 border-2 border-yellow-400">Login</Button>
                </div>
            </form>
            <p id="error-message"></p>
        </div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/store'
import { mapStores, mapState, mapActions } from 'pinia'
export default {
    data() {
        return {
            email: 'jcblee@gmail.com',
            password: 'asdfasdf'
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['toggleLoading', 'toggleError', 'login'] ),
        async loginUser() {
            await this.login( this.email, this.password );
            this.$router.push( "/participantDashboard" );
        }
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