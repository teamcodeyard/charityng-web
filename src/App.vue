<template>
  <div>
    <component :is="layoutComponent.bind.is" v-bind="layoutComponent.bind"/>
  </div>
</template>

<script>
import LoggedOutAdminLayout from '@/views/layouts/LoggedOutAdminLayout.vue';

export default {
  name: 'App',
  computed: {
    layoutComponent() {
      return this.loggedOutAdminLayoutComponent;
    },
    loggedOutAdminLayoutComponent() {
      return {
        bind: {
          is: LoggedOutAdminLayout,
        },
      };
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/global.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
