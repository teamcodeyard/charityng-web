<template>
  <div id="modal">
    <div class="modal-content-wrapper shadow-box">
      <component
        v-for="(modalContentComponent, index) of modalContentComponents"
        :key="index"
        :is="modalContentComponent.bind.is"
        v-bind="modalContentComponent.bind"
        v-on="modalContentComponent.on"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalContentComponents: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
#modal {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-content-wrapper {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
  }
}
</style>
