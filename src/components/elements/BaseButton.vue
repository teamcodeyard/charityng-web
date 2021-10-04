<template>
  <div class="base-button" :style="style" @click="clicked">
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
        border: '1px solid #0984e3',
        'border-radius': '8px',
        'background-color': '#0984e3',
      }),
    },
  },
  methods: {
    clicked() {
      this.$emit('clicked');
    },
  },
};
</script>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  text-align: center;
}
</style>
