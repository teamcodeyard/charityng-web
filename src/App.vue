<template>
  <div :style="basicStyles" v-if="organisation">
    <component :is="layoutComponent.bind.is" v-bind="layoutComponent.bind" />
    <modal
      v-if="modalContentComponents"
      :modalContentComponents="modalContentComponents"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoggedOutAdminLayout from '@/views/layouts/LoggedOutAdminLayout.vue';
import AdminLayout from '@/views/layouts/AdminLayout.vue';
import PublicLayout from '@/views/layouts/PublicLayout.vue';
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
    this.fetchOrganisation();
    this.$eventBus.on('showModal', this.showModal);
    this.$eventBus.on('hideModal', this.hideModal);
  },
  computed: {
    ...mapGetters({
      loggedInAdminUser: 'adminUsers/adminUser',
      organisation: 'organisation/organisation',
    }),
    layoutComponent() {
      if (this.$route.meta.isAdmin && this.loggedInAdminUser) {
        return this.adminLayoutComponent;
      }
      return this.publicLayoutComponent;
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
    publicLayoutComponent() {
      return {
        bind: {
          is: PublicLayout,
        },
      };
    },
    basicStyles() {
      return {
        '--primaryColor': `#${this.organisation.colors.primary}`,
        '--secondaryColor': `#${this.organisation.colors.secondary}`,
        '--primary': `#${this.organisation.colors.primary}`,
        '--secondary': `#${this.organisation.colors.secondary}`,
        '--contentMaxWidth': '1041px',
      };
    },
  },
  methods: {
    ...mapActions({
      fetchOrganisation: 'organisation/fetchOrganisation',
    }),
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
