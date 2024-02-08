<template>
    <div class="py-5 md:px-48" p-10>
        <section>
            <h1 class="text-4xl font-bold">
                Each story begins with a single letter.
            </h1>
            <h2 class="my-5 text-2xl font-bold">The Fudeko Project helps Japanese American former incarcerees share their
                stories with loved ones.</h2>
            <p><strong>We send you weekly prompts. You pick one and respond via email or letter.</strong> We compile your
                responses online so you can share them with family and friends. At the end of a year, you get a booklet, a
                physical record of your work.


                I saw firsthand how my grandmother, Fudeko Tsuji Maruyama, struggled to talk about her experiences at Jerome
                and Heart Mountain. Despite expressing an interest in recording her stories, she often shut down quickly as
                she began speaking. When I was in high school, she answered some questions for me via letter—that’s where
                the idea for this project originates.


                The Fudeko Project creates bite-sized opportunities for storytellers to practice telling their stories,
                building up comfort bit by bit. It fits into your daily routine, uses familiar tools (like email and
                pre-stamped envelopes), and can be done from the comfort of your own home. We're registering our first
                cohort now. We hope you'll join us on this adventure—when you're ready, you can sign up below.</p>
        </section>
        <section class="py-5">
            <p>Already signed up? Click the link  <router-link to="/login" class="text-yellow-600">here</router-link> to be directed to your prompts of the day!</p>
        </section>
        <section class="my-24">
            <h2 class="text-2xl font-bold text-left">Sign up</h2>
            <p class="my-2">Ready to sign up? Fill out the form below or mail in the print copy to the address on the form.</p>
            <div class="flex justify-center"><iframe src="https://docs.google.com/forms/d/e/1FAIpQLScx_8WOpPrrqXlrD6BJ5KZujxSjxWbq9KIzlrg9Q-azQO7QKQ/viewform?embedded=true" width="640" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe></div>
        </section>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>