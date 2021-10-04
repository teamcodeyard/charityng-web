<template>
  <div id="organisation-screen" v-if="organisation">
    <div class="row">
      <div class="col-12">
        <base-input
          v-model="organisation.name"
          :placeHolder="$t('admin.organisationScreen.form.name.placeholder')"
        />
      </div>
      <div class="col-6">
        <base-input
          v-model="organisation.contact.address"
          :placeHolder="
            $t('admin.organisationScreen.form.contact.address.placeholder')
          "
        />
      </div>
      <div class="col-6">
        <base-input
          v-model="organisation.contact.phone"
          :placeHolder="
            $t('admin.organisationScreen.form.contact.phone.placeholder')
          "
        />
      </div>
      <div class="col-12">
        <base-input
          v-model="organisation.contact.email"
          :placeHolder="
            $t('admin.organisationScreen.form.contact.email.placeholder')
          "
        />
      </div>
      <div class="col-12">
        <base-input
          v-model="organisation.introduction"
          :placeHolder="
            $t('admin.organisationScreen.form.introduction.placeholder')
          "
        />
      </div>
      <div class="col-6">
        <base-input
          v-model="organisation.colors.primary"
          :placeHolder="
            $t('admin.organisationScreen.form.colors.primary.placeholder')
          "
        />
      </div>
      <div class="col-6">
        <base-input
          v-model="organisation.colors.secondary"
          :placeHolder="
            $t('admin.organisationScreen.form.colors.secondary.placeholder')
          "
        />
      </div>
    </div>
    <base-button
      :title="$t('admin.organisationScreen.form.submitButton.title')"
      @clicked="save"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseInput from '@/components/elements/BaseInput.vue';
import BaseButton from '@/components/elements/BaseButton.vue';

export default {
  name: 'OranisationScreen',
  components: {
    BaseInput,
    BaseButton,
  },
  data: () => ({
    organisation: undefined,
  }),
  async created() {
    this.fetchOrganisation().then((organisation) => {
      this.organisation = organisation;
    });
  },
  methods: {
    ...mapActions({
      fetchOrganisation: 'organisation/fetchOrganisation',
      updateOrganisation: 'organisation/updateOrganisation',
    }),
    save() {
      this.updateOrganisation(this.organisation).then((organisation) => {
        this.organisation = organisation;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
