<template>
  <div class="campaign-card d-flex">
    <div class="image-header">
      <div
        class="cover-image"
        :style="{ background: `url('${coverImageUrl}')` }"
      >
        <span
          v-for="(resourceType, index) of resourceTypes"
          :key="index"
          class="resource-type-label"
          v-t="`public.general.resources.type.${resourceType}`"
        >
        </span>
      </div>
    </div>
    <div class="card-content">
      <div class="row">
        <div class="col-4">
          <base-icon
            imageUrl="/images/icons/progress.svg"
            labelText="89%"
            labelColor="#18d231"
          />
        </div>
        <div class="col-4">
          <base-icon
            imageUrl="/images/icons/participants.svg"
            labelText="43"
            labelColor="#f64c71"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="title">
            <router-link
              :to="{
                name: 'CampaignScreen',
                params: { campaignId: campaign._id },
              }"
              >{{ campaign.title }}</router-link
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div
            class="resource-title"
            v-t="'public.campaignCard.resourceTitle'"
          ></div>
          <div class="resources">{{ resourcesString }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="description">
            {{ campaign.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex align-items-center">
      <base-icon imageUrl="/images/icons/poi.svg" :labelText="locationString" />
      <router-link
        :to="{ name: 'CampaignScreen', params: { campaignId: campaign._id } }"
        class="next-link"
        >{{ $t('public.campaignCard.nextLinkText') }}</router-link
      >
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/elements/BaseIcon.vue';

export default {
  name: 'CampaignCard',
  components: {
    BaseIcon,
  },
  props: {
    campaign: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverImageUrl() {
      if (!this.campaign.mediaList || this.campaign.mediaList.length === 0) {
        return '';
      }
      return this.campaign.mediaList[0].url;
    },
    resourceTypes() {
      if (!this.campaign.resources) {
        return [];
      }
      return new Set(this.campaign.resources.map((x) => x.type));
    },
    resourcesString() {
      if (!this.campaign.resources) {
        return '';
      }
      return this.campaign.resources
        .map((x) => x.name)
        .join(', ')
        .toUpperCase();
    },
    locationString() {
      // TODO use campaign.location
      return 'Debrecen, Magyarország';
    },
  },
};
</script>

<style lang="scss" scoped>
.campaign-card {
  height: 400px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  flex-direction: column;
  position: relative;
  .image-header {
    height: 40%;
    width: 100%;
    .cover-image {
      max-width: 100%;
      height: 100%;
      background-size: cover !important;
      position: relative;
      .resource-type-label {
        position: absolute;
        bottom: 20px;
        left: 20px;
      }
    }
  }
  .card-content {
    padding: 0 15px;
    & > .row {
      padding: 5px 0;
    }
    .progress-icon,
    .participants-icon {
      max-height: 14px;
    }
    .progress-label {
      font-family: Ubuntu;
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #18d231;
      margin-left: 5px;
    }
    .participants-label {
      font-family: Ubuntu;
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #606060;
      margin-left: 5px;
    }
    .title {
      font-family: Roboto;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: left;
      color: #242424;
    }
    .resource-title {
      font-family: Ubuntu;
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #606060;
      font-weight: bold;
    }
    .resources {
      font-family: Ubuntu;
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: left;
      color: #f64c71;
    }
    .description {
      font-family: Ubuntu;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #606060;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 160px;
      height: 1.2em;
      white-space: nowrap;
    }
  }
  .card-footer {
    margin-top: auto;
    img {
      margin-right: 5px;
      max-height: 14px;
    }
    .location {
      font-family: Ubuntu;
      font-size: 10px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #606060;
    }
    .next-link {
      font-family: Ubuntu;
      font-size: 10px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: normal;
      text-align: left;
      color: #f64c71;
      margin-left: auto;
    }
  }
}
</style>
