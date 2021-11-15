<template>
  <footer class="base-footer text-lg-start">
    <!-- Section: Links  -->
    <section class="">
      <div class="container text-md-start mt-5">
        <div class="row">
          <div class="col-12 col-md-3">
            <div class="d-flex organisation">
              <img :src="organisation.logoUrl" alt="" class="logo" />
              <div class="organisation-name">{{ organisation.name }}</div>
            </div>
            <div class="contact d-flex flex-column">
              <div
                class="title"
                v-t="'public.layout.footer.contactTitle'"
              ></div>
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
          <div class="col-12 col-md-3 offset-md-2">
            <div class="navigation d-flex flex-column">
              <div
                class="title"
                v-t="'public.layout.footer.navigationTitle'"
              ></div>
              <div
                v-for="(item, index) of navItems"
                :key="index"
                class="navigation-item"
              >
                <router-link :to="item.path">{{
                  $t(item.translationKey)
                }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Links  -->

    <!-- Copyright -->
    <div class="text-center p-4 copyright">
      © 2021 CodeYard. All Rights Resevered. Design by KruGer
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</template>

<script>
export default {
  name: 'BaseFooter',
  components: {},
  props: {
    organisation: {
      type: Object,
    },
    navItems: {
      type: Array,
    },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss" scoped>
.base-footer {
  background-color: var(--primaryColor) !important;
  color: #fff;
  padding: 32px;

  .organisation {
    margin-bottom: 38px;
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
  .contact {
    font-family: Ubuntu;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: left;
    margin-bottom: 15px;
    a {
      color: #fff;
    }
    div {
      margin: 10px 0;
    }
    .title {
      font-weight: bold;
      font-size: 16px;
    }
  }
  .navigation {
    .title {
      font-weight: bold;
    }
    a {
      font-family: Ubuntu;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.5;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }
  .copyright {
    font-family: Ubuntu;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 3;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
}
</style>
