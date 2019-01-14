<template>
  <div class="login-view">
    <h1>Sample App</h1>
    <SaLoginForm :onlogin="handleLogin" />
  </div>
</template>

<script>
import SaLoginForm from '@/components/molecules/SaLoginForm.vue'

export default {
  name: 'SaLoginView',

  components: {
    SaLoginForm
  },

  methods: {
    hadleLogin (authInfo) {
      return this.$store.dispatch('login', authInfo)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(err => this.throwReject(err))
    },
    throwReject (err) { return Promise.reject(err) }
  }
}
</script>

<style scoped>
.login-view {
  witdh: 320px;
  margin: auto;
}
</style>
