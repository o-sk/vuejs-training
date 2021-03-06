<template>
  <form novalidate>
    <div class="form-item">
      <label for="email">email</label>
      <input
        id="email"
        v-model="email"
        type="text"
        autocomplete="off"
        placeholder="foobar@example.com"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.email.format">invalid email format</li>
        <li v-if="!validation.email.required">empty</li>
      </ul>
    </div>
    <div class="form-item">
      <label for="password">password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        placeholder="password"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.password.required">empty</li>
      </ul>
    </div>
    <div class="form-actions">
      <SaButton
        :disabled="disableLoginAction"
        @click="handleClick"
      >
        login
      </SaButton>
      <p
        v-if="progress"
        class="login-progress"
      >
        login...
      </p>
      <p
        v-if="error"
        class="login-error"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script>
import SaButton from '@/components/atoms/SaButton.vue'

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const required = val => !!val.trim()

export default {
  name: 'SaLoginForm',

  components: {
    SaButton
  },

  props: {
    onlogin: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      email: '',
      password: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    validation () {
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password)
        }
      }
    },

    valid () {
      const validation = this.validation
      const fields = Object.keys(validation)
      let valid = true
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        valid = Object.keys(validation[field])
          .every(key => validation[field][key])
        if (!valid) { break }
      }
      return valid
    },

    disableLoginAction () {
      return !this.valid || this.progress
    }
  },

  methods: {
    resetError () {
      this.error = ''
    },

    handleClick (e) {
      if (this.disableLoginAction) { return }

      this.progress = true
      this.error = ''

      this.$nextTick(() => {
        this.onlogin({ email: this.email, password: this.password })
          .catch(err => {
            this.error = err.message
          })
          .then(() => {
            this.progress = false
          })
      })
    }
  }
}
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  text-align: left;
}
label {
  display: block;
}
input {
  width: 100%;
  padding: .5em;
  font: inherit;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0.25em 0;
}
ul li {
  font-size: 0.5em;
}
.validation-errors {
  height: 32px;
}
.form-actions p {
  font-size: 0.5em;
}
</style>
