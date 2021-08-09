<template>
  <div id="home">
    <div class="row">
      <div class="col-6 d-flex justify-content-end">
        <input v-model="name" />
      </div>
      <div class="col-6 d-flex justify-content-start">
        <input type="button" @click="save" value="Do it!" />
      </div>
    </div>
      <ul class="name-list">
        <li v-for="(name, index) of names" :key="index">
          <transition appear name="slide-fade">
            <div class="name-list-item">
              {{ name }} <span class="delete" @click="remove(index)">X</span>
            </div>
          </transition>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data: () => ({
    name: undefined,
    names: [],
  }),
  created() {},
  mounted() {},
  computed: {},
  methods: {
    save() {
      this.names.push(this.name);
      this.name = '';
    },
    remove(index) {
      this.names.splice(index, 1);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
$primaryColor: rgb(148, 17, 191);

#home {
  .name-list {
    li {
      color: $primaryColor;
      margin: 8px;
      padding: 4px;
      font-weight: bold;
      border: 1px solid $primaryColor;
      .delete {
        color: red;
        cursor: pointer;
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
