<template>
    <div class="fixed top-0 left-0 z-10 grid w-screen h-screen p-8 place-items-center">

        <OnClickOutside @trigger="close">
            <transition name="fade">
                <section v-show="showing" class="px-32 py-12 border-2 border-white rounded-sm shadow-lg fudeko-orange" ref="el">
                    <slot>

                    </slot>
                </section>
            </transition>
        </OnClickOutside>

    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/store';
import { OnClickOutside } from '@vueuse/components'

export default {
    components: {
        OnClickOutside,
    },
    props: {
        showing: {
            type: Boolean,
        },
    },
    data() {
        return {
            participants: null,
            response: null,
        }
    },
    async mounted() {
        this.response = this.partialResponse.reponse_text;
        setTimeout(() => {
            this.show = true;
        }, 1000);
    },
    computed: {
        ...mapState( useCounterStore, ['user', 'loading', 'participantRecord', 'partialResponse'] ),
        first_name() {
            return this.participantRecord?.first_name;
        }
    },
    methods: {
        ...mapActions( useCounterStore, ['initializeStore', 'toggleLoading'] ),
        close() {
            this.$emit('close');
        }
    },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>