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
      return supabaseUrl.includes("cfgiqouvnfofhciztbri");
    }
  }
}
</script>

<template>
  <div>
    <p v-if="isDev">Development</p>
    <small>Commit: {{ commitHash }}</small><br>
    <small>Message: {{ commitMessage }}</small>
  </div>
</template>