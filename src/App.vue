<template>
  <div>
    <component :is="layoutComponent.bind.is" v-bind="layoutComponent.bind" />
    <modal
      v-if="modalContentComponents"
      :modalContentComponents="modalContentComponents"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoggedOutAdminLayout from '@/views/layouts/LoggedOutAdminLayout.vue';
import AdminLayout from '@/views/layouts/AdminLayout.vue';
import Modal from '@/components/elements/Modal.vue';

export default {
  name: 'App',
  components: {
    Modal,
  },
  data: () => ({
    modalContentComponents: undefined,
  }),
  created() {
    this.$eventBus.on('showModal', this.showModal);
    this.$eventBus.on('hideModal', this.hideModal);
  },
  computed: {
    ...mapGetters({
      loggedInAdminUser: 'adminUsers/adminUser',
    }),
    layoutComponent() {
      if (this.loggedInAdminUser) {
        return this.adminLayoutComponent;
      }
      return this.loggedOutAdminLayoutComponent;
    },
    loggedOutAdminLayoutComponent() {
      return {
        bind: {
          is: LoggedOutAdminLayout,
        },
      };
    },
    adminLayoutComponent() {
      return {
        bind: {
          is: AdminLayout,
        },
      };
    },
  },
  methods: {
    showModal(modalContentComponents) {
      this.modalContentComponents = modalContentComponents;
    },
    hideModal() {
      this.modalContentComponents = undefined;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/css/global.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
