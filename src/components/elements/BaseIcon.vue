<template>
  <div class="base-icon d-flex align-items-center">
    <img :src="imageUrl" />
    <span v-if="labelText" :style="{ color: labelColor }" class="label">{{
      labelText
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: false,
    },
    labelColor: {
      type: String,
      required: false,
      default: '#606060',
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  font-family: Ubuntu;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  font-weight: bold;
  margin-left: 5px;
}
</style>
