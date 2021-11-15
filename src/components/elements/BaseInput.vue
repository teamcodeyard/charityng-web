<template>
  <div class="base-input">
    <input
      :type="type"
      :placeholder="placeHolder"
      :style="style"
      v-model="localValue"
      @keyup.enter="$emit('submit')"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    placeHolder: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    modelValue: {
      type: String,
    },
    style: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      localValue: this.modelValue,
    };
  },
  emits: ['submit'],
  watch: {
    modelValue(val) {
      this.localValue = val;
    },
    localValue(val) {
      this.$emit('update:modelValue', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  input {
    width: 100%;
    outline: none;
  }
}
</style>
