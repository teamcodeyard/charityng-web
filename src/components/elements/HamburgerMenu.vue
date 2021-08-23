<template>
  <div class="hamburger-menu">
    <button class="navbar-toggler" type="button" @click="toggleMenu">
      <span class="navbar-toggler-icon"></span>
      <div :class="{ 'hamburger-menu-list': true, 'is-open': isOpen }">
        <menu-list :navItems="navItems" />
      </div>
    </button>
  </div>
</template>

<script>
import MenuList from '@/components/elements/MenuList.vue';

export default {
  name: 'HamburgerMenu',
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
  components: {
    MenuList,
  },
  data: () => ({
    isOpen: false,
  }),
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    classForItem(index) {
      return {
        'nav-item': true,
        active: this.$route.fullPath === this.navItems[index].path,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.hamburger-menu {
  position: relative;
  .hamburger-menu-list {
    display: none;
    position: absolute;
    right: 0%;
    background: #FFF;
    border: 1px solid #AAA;
    border-radius: 8px;
    margin: 10px 0;
    padding: 10px;
    font-size: 12px;
    &.is-open {
      display: block;
    }
  }
}
</style>
