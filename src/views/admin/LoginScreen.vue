<template>
  <div id="login-screen">
    <div class="row">
      <div
        class="form col-6 col-md-4 col-lg-4 offset-3 offset-md-4 offset-lg-4"
      >
        <div class="row">
          <div class="col-12">
            <div class="form-title">
              {{ $t('admin.loginScreen.form.title') }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <base-input
              v-model="email"
              type="email"
              :placeHolder="$t('admin.loginScreen.form.email.placeholder')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <base-input
              v-model="password"
              type="password"
              :placeHolder="$t('admin.loginScreen.form.password.placeholder')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <base-button
              :title="$t('admin.loginScreen.form.submitButton.title')"
              @clicked="login"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseInput from '@/components/elements/BaseInput.vue';
import BaseButton from '@/components/elements/BaseButton.vue';

export default {
  name: 'LoginScreen',
  components: {
    BaseInput,
    BaseButton,
  },
  data: () => ({
    email: undefined,
    password: undefined,
  }),
  methods: {
    ...mapActions({
      authenticate: 'adminUsers/authenticate',
    }),
    login() {
      this.authenticate({
        email: this.email,
        password: this.password,
        deviceId: 'TODOWEB', // TODO: use deviceId
      }).then(() => {
        window.location.href = '/admin/users';
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login-screen {
  .row {
    margin: 10px 0;
  }
  .form {
    border: 1px solid #aaa;
    border-radius: 8px;
  }
}
</style>
