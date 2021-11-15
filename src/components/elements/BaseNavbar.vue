<template>
  <nav
    class="
      base-navbar
      navbar navbar-expand-lg navbar-light
      bg-light
      justify-content-center
    "
  >
    <div class="wrapper d-flex">
      <hamburger-menu :navItems="navItems" />
      <div
        class="organisation d-flex justify-content-center align-items-center"
      >
        <img :src="organisation.logoUrl" alt="" class="logo" />
        <div class="organisation-name">{{ organisation.name }}</div>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <menu-list :navItems="navItems" />
      </div>
      <base-icon
        class="header-icon"
        v-if="headerIcon"
        :imageUrl="headerIcon.url"
        @click="headerIcon.handler"
      />
      <base-button
        class="header-button d-none d-lg-block"
        :title="buttonText"
        @clicked="buttonHandler"
      />
    </div>
  </nav>
</template>

<script>
import HamburgerMenu from '@/components/elements/HamburgerMenu.vue';
import MenuList from '@/components/elements/MenuList.vue';
import BaseButton from '@/components/elements/BaseButton.vue';
import BaseIcon from '@/components/elements/BaseIcon.vue';

export default {
  name: 'BaseNavbar',
  components: {
    HamburgerMenu,
    MenuList,
    BaseButton,
    BaseIcon,
  },
  props: {
    navItems: {
      type: Array,
    },
    buttonText: {
      type: String,
    },
    organisation: {
      type: Object,
    },
    headerIcon: {
      type: Object,
      required: false,
    },
  },
  data: () => ({}),
  methods: {
    buttonHandler() {
      this.$emit('buttonClicked');
    },
  },
};
</script>

<style lang="scss" scoped>
.base-navbar {
  background-color: var(--primaryColor) !important;
  .wrapper {
    width: var(--contentMaxWidth);
    .organisation {
      margin-right: 25px;
      .logo {
        max-height: 43px;
      }
      .organisation-name {
        font-family: Ubuntu;
        font-size: 30px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
      }
    }
    .header-button {
      cursor: pointer;
      margin-left: auto;
    }
    .header-icon {
      cursor: pointer;
      margin: 0 15px;
    }
  }
}
</style>
