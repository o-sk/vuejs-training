<template>
  <button
    :class="classes"
    :disabled="disabled"
    type="button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SaButton',

  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      const suffix = this.type === 'text' ? ('-' + this.type) : ''
      return [`sa-button${suffix}`]
    }
  },

  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
.sa-button {
  padding: .6em 1.3em;
}
.sa-button-text {
  border: none;
  padding-right: 0;
  padding-left: 0;
}

</style>
