<script>
export default {
  data() {
    return {
      isDev: this.checkEnvironment(),
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
  </div>
</template>