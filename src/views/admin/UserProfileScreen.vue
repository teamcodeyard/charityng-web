<template>
  <div id="user-profile-screen" v-if="user">
    <div class="profile-header shadow-box">
      <div class="row">
        <div class="col-4 d-flex align-items-center justify-content-center">
          <img
            :src="user.profileImageUrl"
            alt="profile"
            class="profile-image"
          />
        </div>
        <div class="col-8 data-table">
          <div class="row">
            <div class="col-6 data-label">
              <div>{{ $t('admin.userProfileScreen.header._id') }}</div>
            </div>
            <div class="col-6 data-value">
              <div>{{ user._id }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 data-label">
              <div>{{ $t('admin.userProfileScreen.header.email') }}</div>
            </div>
            <div class="col-6 data-value">
              <div>{{ user.email }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 data-label">
              <div>{{ $t('admin.userProfileScreen.header.firstName') }}</div>
            </div>
            <div class="col-6 data-value">
              <div>{{ user.firstName }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 data-label">
              <div>{{ $t('admin.userProfileScreen.header.lastName') }}</div>
            </div>
            <div class="col-6 data-value">
              <div>{{ user.lastName }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 data-label">
              <div>{{ $t('admin.userProfileScreen.header.bio') }}</div>
            </div>
            <div class="col-6 data-value">
              <div>{{ user.bio }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 data-label">
              <div>{{ $t('admin.userProfileScreen.header.status') }}</div>
            </div>
            <div class="col-6 data-value">
              <div>{{ user.status }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserProfileScreen',
  data: () => ({
    user: undefined,
  }),
  async created() {
    this.user = await this.fetchUser(this.$route.params.userId);
  },
  methods: {
    ...mapActions({
      fetchUser: 'admin.users/fetchUser',
    }),
  },
};
</script>

<style lang="scss" scoped>
#user-profile-screen {
  .profile-header {
    padding: 10px;
    .profile-image {
      max-height: 100px;
    }
    .data-table {
      text-align: left;
      .data-label {
        font-weight: bold;
      }
      .data-value {
      }
    }
  }
}
</style>
