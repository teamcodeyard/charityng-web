<template>
  <div id="public-layout">
    <base-navbar
      :navItems="navItems"
      :buttonText="navbarButtonText"
      :organisation="organisation"
      :headerIcon="headerIcon"
      @buttonClicked="navbarButtonClicked"
    />
    <div class="content">
      <router-view />
    </div>
    <base-footer :navItems="navItems" :organisation="organisation" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseNavbar from '@/components/elements/BaseNavbar.vue';
import BaseFooter from '@/components/elements/BaseFooter.vue';
import FormBuilder from '@/components/admin/FormBuilder.vue';
import MessagesModal from '@/components/modals/MessagesModal.vue';

export default {
  name: 'PublicLayout',
  components: {
    BaseNavbar,
    BaseFooter,
  },
  created() {
    this.$eventBus.on('requestLogin', this.requestLogin);
    if (this.userApiKey) {
      this.fetchProfile();
    }
  },
  computed: {
    ...mapGetters({
      loggedInUserProfile: 'users/loggedInUserProfile',
      userApiKey: 'userApiKey',
      organisation: 'organisation/organisation',
    }),
    navItems() {
      return [
        {
          path: '/',
          translationKey: 'public.layout.navbar.search',
        },
        {
          path: '/about-us',
          translationKey: 'public.layout.navbar.aboutUs',
        },
      ];
    },
    navbarButtonText() {
      if (this.loggedInUserProfile) {
        return this.$t('public.layout.navbar.logout');
      }
      return this.$t('public.layout.navbar.login');
    },
    headerIcon() {
      if (this.loggedInUserProfile) {
        return {
          url: '/images/icons/message.svg',
          handler: this.showMessages,
        };
      }
      return undefined;
    },
  },
  methods: {
    ...mapActions({
      login: 'users/login',
      logout: 'users/logout',
      fetchProfile: 'users/fetchProfile',
    }),
    requestLogin() {
      /* eslint-disable */
      this.$eventBus.emit('showModal', [
        {
          bind: {
            is: FormBuilder,
            fields: [
              {
                name: 'email',
                label: this.$t('public.modals.login.email.label'),
                placeholder: this.$t('public.modals.login.email.placeholder'),
              },
              {
                name: 'password',
                type: 'password',
                label: this.$t('public.modals.login.password.label'),
                placeholder: this.$t(
                  'public.modals.login.password.placeholder'
                ),
              },
            ],
          },
          on: {
            submit: this.handleLogin,
            cancel: () => this.$eventBus.emit('hideModal'),
          },
        },
      ]);
      /* eslint-enable */
    },
    handleLogin(payload) {
      this.login(payload).then(() => {
        this.$eventBus.emit('hideModal');
      });
    },
    navbarButtonClicked() {
      if (this.loggedInUserProfile) {
        this.logout();
        window.location.reload();
      } else {
        this.$eventBus.emit('requestLogin');
      }
    },
    showMessages() {
      /* eslint-disable */
      this.$eventBus.emit('showModal', [
        {
          bind: {
            is: MessagesModal,
          },
          on: {},
        },
      ]);
      /* eslint-enable */
    },
  },
};
</script>

<style lang="scss" scoped>
#public-layout {
  position: relative;
  .content {
    min-height: 90vh;
  }
}
</style>
