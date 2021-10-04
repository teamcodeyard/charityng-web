<template>
  <div id="campaign-details-screen" v-if="campaign">
    <div class="row">
      <div class="col-12">
        <div class="campaign-details-header shadow-box">
          <div class="row">
            <div class="col-12 data-table">
              <div class="row">
                <div class="col-6 data-label">
                  <div>{{ $t('admin.campaignDetailsScreen.header._id') }}</div>
                </div>
                <div class="col-6 data-value">
                  <div>{{ campaign._id }}</div>
                </div>
                <div class="col-6 data-label">
                  <div>
                    {{ $t('admin.campaignDetailsScreen.header.title') }}
                  </div>
                </div>
                <div class="col-6 data-value">
                  <div>{{ campaign.title }}</div>
                </div>
                <div class="col-6 data-label">
                  <div>
                    {{ $t('admin.campaignDetailsScreen.header.description') }}
                  </div>
                </div>
                <div class="col-6 data-value">
                  <div>{{ campaign.description }}</div>
                </div>
                <div class="col-6 data-label">
                  <div>
                    {{ $t('admin.campaignDetailsScreen.header.status') }}
                  </div>
                </div>
                <div class="col-6 data-value">
                  <div>
                    {{
                      $t(
                        `admin.campaignDetailsScreen.header.status.${campaign.status}`
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-5">
        <h3 v-t="'admin.campaignDetailsScreen.mediaList.title'"></h3>
      </div>
      <div class="col-12">
        <drop-zone @fileSelected="fileSelected" />
      </div>
      <div
        v-for="(media, index) of campaign.mediaList"
        :key="index"
        class="col-3 media-list"
      >
        <img :src="media.url" alt="" class="media-image" />
      </div>
    </div>
    <div class="row resource-list">
      <div class="col-12 mt-5">
        <h3 v-t="'admin.campaignDetailsScreen.resources.title'"></h3>
        <div
          class="btn btn-primary"
          v-t="'admin.campaignDetailsScreen.resources.add'"
          @click="showNewResourceModal"
        ></div>
      </div>
      <div
        v-for="(resource, index) of campaign.resources"
        :key="index"
        class="col-12 shadow-box resource-item"
      >
        <div class="name">
          <router-link
            :to="{
              name: 'ResourceDetailsScreen',
              params: { resourceId: resource._id },
            }"
          >
            {{ resource.name }}
          </router-link>
        </div>
        <div
          class="type"
          v-t="`admin.campaignDetailsScreen.resources.type.${resource.type}`"
        ></div>
        <div class="quantity">
          {{ resource.quantity }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FormData from 'form-data';
import DropZone from '@/components/elements/DropZone.vue';
import FormBuilder from '@/components/admin/FormBuilder.vue';

export default {
  name: 'CampaignDetailsScreen',
  components: {
    DropZone,
  },
  data: () => ({
    campaign: undefined,
  }),
  async created() {
    this.campaign = await this.fetchCampaign(this.$route.params.campaignId);
  },
  methods: {
    ...mapActions({
      fetchCampaign: 'admin.campaigns/fetchCampaign',
      uploadImages: 'admin.campaigns/uploadImages',
      createResource: 'admin.campaigns/createResource',
    }),
    fileSelected(files) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file, file.name);
      });
      this.uploadImages({
        campaignId: this.$route.params.campaignId,
        formData,
      }).then((campaign) => {
        this.campaign = campaign;
      });
    },
    showNewResourceModal() {
      this.$eventBus.emit('showModal',[{
        bind: {
          is: FormBuilder,
          fields: [
            {
              name: 'name',
              label: this.$t(
                'admin.campaignDetailsScreen.newModalForm.name.label',
              ),
              placeholder: this.$t(
                'admin.campaignDetailsScreen.newModalForm.name.placeholder',
              ),
            },
            {
              name: 'type',
              type: 'radio',
              labels: [this.$t(
                'admin.campaignDetailsScreen.newModalForm.type.label.0',
              ),
              this.$t(
                'admin.campaignDetailsScreen.newModalForm.type.label.1',
              )],
              options: [0, 1],
            },
            {
              name: 'quantity',
              type: 'number',
              label: this.$t(
                'admin.campaignDetailsScreen.newModalForm.quantity.label',
              ),
              placeholder: this.$t(
                'admin.campaignDetailsScreen.newModalForm.quantity.placeholder',
              ),
            },
          ],
        },
        on: {
          submit: this.handleNewResource,
          cancel: () => this.$eventBus.emit('hideModal'),
        },
      }]);
    },
    handleNewResource(payload) {
      this.createResource({
        campaignId: this.$route.params.campaignId,
        resource: payload,
      }).then((campaign) => {
        this.campaign = campaign;
        this.$eventBus.emit('hideModal');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#campaign-details-screen {
  .campaign-details-header {
    padding: 10px;
    .data-table {
      text-align: left;
      .data-label {
        font-weight: bold;
      }
      .data-value {
      }
    }
  }
  .media-list {
    .media-image {
      max-height: 120px;
      border-radius: 8px;
    }
  }
  .resource-list {
    .resource-item {
      .name {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
