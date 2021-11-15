<template>
  <div class="progress-bar d-flex justify-content-center">
    <div class="progress-bar-label">{{ percent }}%</div>
    <div class="progress-bar-progress" :style="progressStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    innerPercent: 0,
  }),
  created() {
    // eslint-disable-next-line no-return-assign
    setTimeout(() => (this.innerPercent = this.percent), 500);
  },
  computed: {
    progressStyle() {
      return {
        width: `${this.innerPercent}%`,
      };
    },
  },
  watch: {
    percent(newValue) {
      this.innerPercent = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  margin: 16px 0 19px;
  border: solid 1px #f64c71;
  background-color: #fff;
  height: 43px;
  position: relative;
  text-align: center;
  .progress-bar-progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #f64c71;
    transition: width 1s ease-in-out;
  }
  .progress-bar-label {
    font-family: Roboto;
    font-size: 25px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.12;
    letter-spacing: normal;
    color: #fff;
    z-index: 1;
    width: 100%;
  }
}
</style>
