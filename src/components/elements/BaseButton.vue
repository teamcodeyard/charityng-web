<template>
  <div
    :class="`base-button d-flex justify-content-center align-items-center ${
      isDisabled ? 'disable' : '?'
    }`"
    :style="style"
    @click="clicked"
  >
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    title: {
      type: String,
      required: true,
    },
    style: {
      type: Object,
      default: () => ({
        color: '#FFF',
        'font-weight': 'bold',
        'border-radius': '8px',
      }),
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    clicked() {
      if (!this.isDisabled) {
        this.$emit('clicked');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  text-align: center;
  padding: 12px 30px;
  box-shadow: 0 0 20px 0 var(--secondaryColor) !important;
  background-color: var(--secondaryColor) !important;
  &.disable {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>
