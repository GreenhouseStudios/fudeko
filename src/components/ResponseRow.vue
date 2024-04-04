<template>
    <div class="my-5 border-2 border-black w-100" @click="show = !show">
        <div class="flex justify-between ">
            <div class="w-1/12 p-4 text-2xl font-bold text-white bg-black">Date</div>
            <div class="flex w-10/12 p-4 text-3xl font-bold text-left align-middle bg-yellow-200">
                <span class="pr-5">Title</span>
                <span class="flex items-center text-sm italic font-normal">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quas tempora, quae
                    qui, distinctio dolorem...</span>
            </div>
            <div class="w-1/12 text-center border-none">
                <Button  :icon=" show ? 'pi pi-times ': 'pi pi-plus'"
                    class="p-3 bg-yellow-100 border-none w-100 h-100 hover:bg-blue-100"></Button>
            </div>

        </div>
        <div class="p-5 border-t-2 border-black" v-show="show">{{ body }}</div>
    </div>
</template>

<script>
import Button from 'primevue/button';
export default {
    data() {
        return {
            show: false,
            body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, nesciunt
            nostrum voluptate numquam voluptatum eveniet earum saepe dolore quod ipsa blanditiis ex reprehenderit?
            Illum quis temporibus adipisci rem distinctio quo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti ut ea placeat blanditiis debitis amet perspiciatis, optio, praesentium dolorem maiores temporibus natus! Praesentium neque debitis accusamus, aliquid ab dolor eos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis veritatis eaque quibusdam aspernatur consequatur cupiditate eos doloremque eum repellendus quis a blanditiis sit velit veniam, eligendi laudantium delectus beatae omnis!`
        }
    },
    methods: {

    },
    components: {
        Button
    },
    mounted() {

    },
    computed: {

    },
}
</script>

<style lang="scss" scoped></style>