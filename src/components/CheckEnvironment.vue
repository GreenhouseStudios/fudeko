<script>
export default {
  data() {
    return {
      isDev: this.checkEnvironment(),
      commitHash: import.meta.env.VITE_GIT_COMMIT_HASH || '',
      commitMessage: import.meta.env.VITE_GIT_COMMIT_MSG || ''
    }
  },
  methods: {
    checkEnvironment() {
      const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || "";
      const devCode = import.meta.env.VITE_APP_DEV_CODE || "";
      return !(devCode == "") && supabaseUrl.includes(devCode);
    }
  }
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 w-64 p-2" v-if="isDev">
    <p>Development</p>
    <small>Commit: {{ commitHash }}</small><br>
    <small>Message: {{ commitMessage }}</small>
  </div>
</template>