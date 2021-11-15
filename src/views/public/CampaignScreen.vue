<template>
  <div id="campaign-screen" v-if="campaign">
    <div class="image-header" :style="imageHeaderStyle"></div>
    <div class="content-wrapper d-flex justify-content-center">
      <div class="content">
        <div class="row">
          <div class="col-7">
            <div class="title mt-2 mb-2">
              {{ campaign.title }}
            </div>
            <div class="stats">
              <div class="row">
                <div class="col-2">
                  <base-icon
                    imageUrl="/images/icons/progress.svg"
                    labelText="89%"
                    labelColor="#18d231"
                  />
                </div>
                <div class="col-2">
                  <base-icon
                    imageUrl="/images/icons/participants.svg"
                    labelText="12"
                    labelColor="#f64c71"
                  />
                </div>
                <div class="col-4">
                  <base-icon
                    imageUrl="/images/icons/calendar.svg"
                    :labelText="
                      moment(campaign.deadline || new Date()).format(
                        'MMMM Do yy'
                      )
                    "
                  />
                </div>
                <div class="col">
                  <base-icon
                    imageUrl="/images/icons/poi.svg"
                    :labelText="campaign.location"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <base-button
              class="fulfillment-button"
              :title="
                $t('public.campaignScreen.header.fulfillmentButton.title')
              "
              @clicked="showFulfillmentModal"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div
              class="sub-title mt-5 mb-3"
              v-t="'public.campaignScreen.content.resources.title'"
            ></div>
          </div>
          <div
            v-for="(resource, index) of campaign.resources"
            :key="index"
            class="col-4 col-lg-2 pb-1 pt-1"
          >
            <div class="resource-value-label">
              {{ resourceStatLabel(resource) }}
            </div>
            <div class="resource-title-label">
              {{ resource.name }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div
              class="sub-title mt-5 mb-3"
              v-t="'public.campaignScreen.content.campaignStatus.title'"
            ></div>
          </div>
          <div class="col-12">
            <progress-bar :percent="89" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div
              class="sub-title mt-5 mb-3"
              v-t="'public.campaignScreen.content.description.title'"
            ></div>
          </div>
          <div class="col-12">
            <div class="campaign-description">{{ campaign.description }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div
              class="sub-title mt-5 mb-3"
              v-t="'public.campaignScreen.content.gallery.title'"
            ></div>
          </div>
          <div
            v-for="(media, index) of campaign.mediaList"
            :key="index"
            class="d-flex justiy-content-center align-items-center media-item"
          >
            <img :src="media.url" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/elements/BaseButton.vue';
import BaseIcon from '@/components/elements/BaseIcon.vue';
import ProgressBar from '@/components/elements/ProgressBar.vue';
import FulfillmentModal from '@/components/modals/FulfillmentModal.vue';

export default {
  name: 'CampaignScreen',
  components: {
    BaseButton,
    BaseIcon,
    ProgressBar,
  },
  data: () => ({
    campaign: undefined,
  }),
  created() {
    this.loadCampaign();
    this.moment = moment;
  },
  computed: {
    ...mapGetters({
      loggedInUserProfile: 'users/loggedInUserProfile',
    }),
    imageHeaderStyle() {
      return {
        background: `url("${this.campaign.mediaList[0].url}")`,
      };
    },
  },
  methods: {
    ...mapActions({
      fetchCampaign: 'campaigns/fetchCampaign',
      createFulfillment: 'campaigns/createFulfillment',
    }),
    loadCampaign() {
      this.fetchCampaign(this.$route.params.campaignId).then((campaign) => {
        this.campaign = campaign;
      });
    },
    resourceStatLabel(resource) {
      const { quantity } = resource;
      let fulfilled = 0;
      if (resource.fulfillments && resource.fulfillments.length > 0) {
        /* eslint-disable */
        console.log(JSON.stringify(resource));
        const filtered = resource.fulfillments
          .map((x) => x.resources)
          .flat()
          .filter((x) => x.resourceId == resource._id);
          console.log(JSON.stringify(filtered));
        fulfilled = filtered.reduce((a, b) => a + b.quantity, 0);
        /* eslint-enable */
      }
      return `${fulfilled}/${quantity}`;
    },
    showFulfillmentModal() {
      if (!this.loggedInUserProfile) {
        this.$eventBus.emit('requestLogin');
      } else {
        /* eslint-disable */
        this.$eventBus.emit('showModal', [
          {
            bind: {
              is: FulfillmentModal,
              campaign: this.campaign,
            },
            on: {
              submit: this.handleNewFullfilment,
              cancel: () => this.$eventBus.emit('hideModal'),
            },
          },
        ]); /* eslint-enable */
      }
    },
    handleNewFullfilment(payload) {
      /* eslint-disable */
      this.createFulfillment({
        campaignId: this.campaign._id,
        body: {
          resources: payload.resources,
          message: payload.message,
        },
      }).then((x) => {
        this.loadCampaign();
        this.$eventBus.emit('hideModal');
      });
      /* eslint-enable */
    },
  },
};
</script>

<style lang="scss" scoped>
#campaign-screen {
  .image-header {
    height: 60vh;
    width: 100%;
    background-size: cover !important;
  }
  .content-wrapper {
    .content {
      background-color: #fff;
      padding: 57px;
      max-width: var(--contentMaxWidth);
      margin-top: -57px;
      .title {
        font-family: Ubuntu;
        font-size: 40px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: left;
        color: #000;
      }
      .sub-title {
        font-family: Ubuntu;
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.11;
        letter-spacing: normal;
        text-align: left;
        color: #606060;
      }
      .resource-value-label {
        font-family: Ubuntu;
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        text-align: left;
        color: #f64c71;
      }
      .resource-title-label {
        font-family: Ubuntu;
        font-size: 13px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.08;
        letter-spacing: normal;
        text-align: left;
        color: #606060;
      }
      .campaign-description {
        font-family: Ubuntu;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.11;
        letter-spacing: normal;
        text-align: left;
        color: #606060;
      }
      .base-icon {
        ::v-deep img {
          max-height: 16px;
        }
      }
      .media-item {
        margin: 15px;
        img {
          width: 140px;
          height: 140px;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
