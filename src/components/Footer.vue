<template>
    <footer>
        <div class="flex flex-col justify-center py-5 mt-40 align-middle ">
            <a href="https://www.fudekoproject.org">
            Fudeko Project
            </a> 

            <router-link to="/adminlogin">
                <p>Administrator Login</p>
            </router-link>
            <div><img src="../assets/Fudeko-Logo-Final.png" alt="fudeko mikan logo" class="inline w-8 md:w-24"></div>
            <!-- <p>&copy; 2024 - {{ new Date().getFullYear() }} Greenhouse Studios</p> -->
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style lang="scss" scoped>

</style>