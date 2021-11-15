<template>
  <div id="admin-layout">
    <base-navbar
      :navItems="navItems"
      :buttonText="$t('admin.layout.navbar.logout')"
      :organisation="organisation"
      @buttonClicked="logout"
    />
    <div id="admin-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseNavbar from '@/components/elements/BaseNavbar.vue';

export default {
  name: 'AdminLayout',
  components: {
    BaseNavbar,
  },
  computed: {
    ...mapGetters({
      loggedInAdminUser: 'adminUsers/adminUser',
      organisation: 'organisation/organisation',
    }),
    navItems() {
      return [
        {
          path: '/admin/users',
          translationKey: 'admin.layout.navbar.userList',
        },
        {
          path: '/admin/campaigns',
          translationKey: 'admin.layout.navbar.campaignList',
        },
        {
          path: '/admin/organisation',
          translationKey: 'admin.layout.navbar.organisation',
        },
      ];
    },
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
  #admin-content {
    margin: 20px;
  }
}
</style>
