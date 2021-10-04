<template>
  <div id="fulfillment-details-screen" v-if="fulfillment && messages">
    <div class="row">
      <base-input
        v-model="message"
        :placeHolder="
          $t('admin.fulfillmentDetailsScreen.form.message.placeholder')
        "
        @submit="submitMessage"
      />
    </div>
    <div
      v-for="(message, index) of messages"
      :key="index"
      class="row"
    >
      <div class="col-12 shadow-box">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseInput from '@/components/elements/BaseInput.vue';

export default {
  name: 'FulfillmentDetailsScreen',
  components: {
    BaseInput,
  },
  data: () => ({
    campaign: undefined,
    pageNumber: 0,
    message: undefined,
    messages: undefined,
  }),
  async created() {
    this.campaign = await this.fetchCampaign(this.$route.params.campaignId);
    this.messages = this.fulfillment.messages;
  },
  computed: {
    resource() {
      if (!this.campaign) {
        return undefined;
      }
      return this.campaign.resources.find(
        // eslint-disable-next-line
        (x) => x._id === this.$route.params.resourceId
      );
    },
    fulfillment() {
      if (!this.resource) {
        return undefined;
      }
      return this.resource.fulfillments.find(
        // eslint-disable-next-line
        (x) => x._id === this.$route.params.fulfillmentId
      );
    },
  },
  methods: {
    ...mapActions({
      fetchCampaign: 'admin.campaigns/fetchCampaign',
      sendMessage: 'admin.campaigns/sendMessage',
    }),
    async submitMessage() {
      const fulfillment = await this.sendMessage({
        /* eslint-disable */
        campaignId: this.campaign._id,
        resourceId: this.resource._id,
        fulfillmentId: this.fulfillment._id,
        message: this.message,
        /* eslint-enable */
      });
      this.messages = fulfillment.messages;
      this.message = '';
    },
  },
};
</script>

<style lang="scss" scoped>
#fulfillment-details-screen {
}
</style>
