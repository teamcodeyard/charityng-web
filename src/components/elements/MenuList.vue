<template>
  <ul class="navbar-nav mr-auto">
    <li
      v-for="(item, index) of navItems"
      :key="index"
      :class="classForItem(index)"
    >
      <router-link :to="item.path" class="nav-link">{{
        $t(item.translationKey)
      }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MenuList',
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
</style>
