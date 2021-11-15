<template>
  <div id="about-us-screen">
    <div class="row">
      <div class="col-12 col-lg-6 offset-lg-3">
        <div class="content-wrapper m-5 shadow-box p-3">
          <div class="title-1">
            <img class="organisation-logo" :src="organisation.logoUrl" />
            {{ organisation.name }}
          </div>
          <p class="lead">
            {{ organisation.introduction }}
          </p>
          <div class="contact">
            <div class="address">{{ organisation.contact.address }}</div>
            <div class="email">
              <a :href="`mailto:${organisation.contact.email}`">{{
                organisation.contact.email
              }}</a>
            </div>
            <div class="phone">
              <a :href="`tel:${organisation.contact.phone}`">{{
                organisation.contact.phone
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AboutUsScreen',
  computed: {
    ...mapGetters({
      organisation: 'organisation/organisation',
    }),
  },
};
</script>

<style lang="scss" scoped>
#about-us-screen {
  .content-wrapper {
    background-color: #e7e7e7;
    .organisation-logo {
      max-height: 50px;
    }
  }
}
</style>
