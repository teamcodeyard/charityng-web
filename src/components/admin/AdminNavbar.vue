<template>
  <nav class="admin-navbar navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/admin">Admin</a>
    <hamburger-menu :navItems="navItems" />
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <menu-list :navItems="navItems" />
    </div>
    <div class="logout d-none d-lg-block" @click="logout">{{$t('admin.layout.navbar.logout')}}</div>
  </nav>
</template>

<script>
import HamburgerMenu from '@/components/elements/HamburgerMenu.vue';
import MenuList from '@/components/elements/MenuList.vue';

export default {
  name: 'AdminNavbar',
  components: {
    HamburgerMenu,
    MenuList,
  },
  data: () => ({
    navItems: [
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
    ],
  }),
  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-navbar {
  .logout {
    cursor: pointer;
  }
}
</style>
