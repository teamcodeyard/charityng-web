<template>
  <div id="campaign-search-screen">
    <div class="search-header d-flex justify-content-center align-items-center">
      <div class="header-titles">
        <div
          class="main-title"
          v-t="'public.campaignSearchScreen.header.mainTitle'"
        ></div>
        <div
          class="sub-title"
          v-t="'public.campaignSearchScreen.header.subTitle'"
        ></div>
      </div>
      <div class="search-area d-flex justify-content-center">
        <div class="row">
          <div class="col-12 col-lg-9">
            <div class="search-box">
              <div
                class="title"
                v-t="`public.campaignSearchScreen.header.searchBox.title`"
              ></div>
              <base-input
                :placeHolder="
                  $t(
                    `public.campaignSearchScreen.header.searchBox.input.placeholder`
                  )
                "
                v-model="searchText"
                @submit="search"
                :style="inputStyle"
              />
            </div>
          </div>
          <div class="col-12 col-lg-3">
            <base-button
              class="search-button"
              :title="
                $t('public.campaignSearchScreen.header.searchButton.title')
              "
              @clicked="search"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="search-result-wrapper d-flex justify-content-center">
      <div class="search-result">
        <div class="row">
          <div class="col-12">
            <div
              class="title-1"
              v-t="'public.campaignSearchScreen.result.title'"
            ></div>
          </div>
        </div>
        <div class="row" v-if="hasCampaigns">
          <div
            class="col-12 col-sm-6 col-md-4 col-ld-3 mt-2 mb-2"
            v-for="(campaign, index) of campaigns"
            :key="index"
          >
            <campaign-card :campaign="campaign" />
          </div>
        </div>
        <div v-else v-t="'public.campaignSearchScreen.result.emptyResultText'"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseButton from '@/components/elements/BaseButton.vue';
import BaseInput from '@/components/elements/BaseInput.vue';
import CampaignCard from '@/components/elements/CampaignCard.vue';

export default {
  name: 'CampaignSearchScreen',
  components: {
    BaseButton,
    BaseInput,
    CampaignCard,
  },
  data: () => ({
    searchText: '',
    campaigns: undefined,
  }),
  created() {
    this.search();
  },
  computed: {
    inputStyle() {
      return {
        border: 'none',
        width: '400px',
        backgroundColor: 'transparent',
      };
    },
    settings: () => ({
      itemsToShow: 2,
      snapAlign: 'center',
    }),
    breakpoints: () => ({
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
    }),
    hasCampaigns() {
      return this.campaigns && this.campaigns.length > 0;
    },
  },
  methods: {
    ...mapActions({
      filterCampaigns: 'campaigns/filterCampaigns',
    }),
    search() {
      this.filterCampaigns({
        searchText: this.searchText,
      }).then((campaigns) => {
        this.campaigns = campaigns;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#campaign-search-screen {
  .search-header {
    height: 70vh;
    background-image: url('http://localhost:3000/cica.JPG');
    background-size: cover;
    position: relative;
    .header-titles {
      max-width: var(--contentMaxWidth);
      .main-title {
        font-family: Ubuntu;
        font-size: 70px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.1;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
        width: 70%;
      }
      .sub-title {
        font-family: Roboto;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.4;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
        width: 70%;
      }
    }
    .search-area {
      position: absolute;
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      .row {
        width: 100%;
      }
      .search-box {
        height: 100px;
        margin: 0 14px 0 0;
        padding: 22px;
        width: 100%;
        box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.16);
        background-color: #fff;
      }
      .base-button {
        height: 100%;
      }
    }
  }
  .search-result-wrapper {
    --vc-nav-background-color: var(--secondaryColor);
    margin-top: 100px;
    padding: 20px 20px;
    .search-result {
      width: var(--contentMaxWidth);
    }
  }
}
</style>
