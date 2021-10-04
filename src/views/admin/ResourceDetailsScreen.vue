<template>
  <div id="resource-details-screen" v-if="resource">
    <div class="row">
      <div class="col-12">
        <div class="resource-head shadow-box">
          <h3>{{ resource.name }}</h3>
          <div>{{ resource.type }}</div>
          <div>{{ resource.quantity }}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <base-list
          v-if="resource.fulfillments"
          :items="resource.fulfillments"
          :headers="headers"
          :hasPagination="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseList from '@/components/elements/BaseList.vue';

export default {
  name: 'ResourceDetailsScreen',
  components: {
    BaseList,
  },
  data: () => ({
    campaign: undefined,
    pageNumber: 0,
  }),
  async created() {
    this.campaign = await this.fetchCampaign(this.$route.params.campaignId);
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
    headers() {
      return [
        {
          translationKey: 'admin.resourceDetals.fulfillments.id',
          path: '_id',
          /* eslint-disable */
          link: (value) =>
            `/admin/campaigns/${this.$route.params.campaignId}/resources/${this.resource._id}/fulfillments/${value}`,
          /* eslint-enable */
        },
        {
          translationKey: 'admin.resourceDetalsScreen.fulfillments.user',
          path: 'userId',
          format: (value) => value,
        },
        {
          translationKey: 'admin.resourceDetalsScreen.fulfillments.lastMessage',
          path: 'messages',
          format: (value) => value[0].message,
        },
        {
          translationKey: 'admin.resourceDetalsScreen.fulfillments.status',
          path: 'status',
          format: (value) => {
            if (value === 0) {
              return this.$t('resources.status.inactive');
            }
            return this.$t('resources.status.active');
          },
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      fetchCampaign: 'admin.campaigns/fetchCampaign',
    }),
  },
};
</script>

<style lang="scss" scoped>
#resource-details-screen {
}
</style>
