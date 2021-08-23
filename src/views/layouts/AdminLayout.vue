<template>
  <div id="admin-layout">
    <admin-navbar @logout="logout" />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AdminNavbar from '@/components/admin/AdminNavbar.vue';

export default {
  name: 'AdminLayout',
  components: {
    AdminNavbar,
  },
  methods: {
    ...mapActions({
      logout: 'adminUsers/logout',
    }),
  },
};
</script>

<style lang="scss" scoped>
#admin-layout {
}
</style>
