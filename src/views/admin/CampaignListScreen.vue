<template>
  <div id="campaign-list-screen">
    <base-input
      v-model="searchText"
      type="text"
      :placeHolder="$t('campaignListScreen.search.placeholder')"
    />
    <button
      class="btn btn-primary mt-2 mb-2"
      @click="showNewModal"
      v-t="'campaignListScreen.showNewModalButton.title'"
    />
    <base-list
      v-if="items"
      :items="items.list"
      :headers="headers"
      :pageNumber="pageNumber"
      :pageCounter="items.pageCounter"
      @previous="showPreviousPage"
      @next="showNextPage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseInput from '@/components/elements/BaseInput.vue';
import BaseList from '@/components/elements/BaseList.vue';
import FormBuilder from '@/components/admin/FormBuilder.vue';

export default {
  name: 'CampaignListScreen',
  components: {
    BaseInput,
    BaseList,
  },
  data: () => ({
    pageNumber: 0,
    searchText: '',
  }),
  created() {
    this.loadData();
  },
  computed: {
    ...mapGetters({
      items: 'admin.campaigns/campaigns',
    }),
    headers() {
      return [
        {
          translationKey: 'admin.campaigns.list.header.id',
          path: '_id',
          link: (value) => `/admin/campaigns/${value}`,
        },
        {
          translationKey: 'admin.campaigns.list.header.title',
          path: 'title',
        },
        {
          translationKey: 'admin.campaigns.list.header.description',
          path: 'description',
        },
        {
          translationKey: 'admin.campaigns.list.header.status',
          path: 'status',
          format: (value) => {
            switch (value) {
              case 0:
                return this.$t('admin.campaigns.list.status.draft');
              case 1:
                return this.$t('admin.campaigns.list.status.active');
              case 2:
                return this.$t('admin.campaigns.list.status.paused');
              case 3:
                return this.$t('admin.campaigns.list.status.completed');
              default:
                return this.$t('admin.campaigns.list.status.failed');
            }
          },
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      fetchCampaigns: 'admin.campaigns/fetchCampaigns',
      createCampaign: 'admin.campaigns/createCampaign',
    }),
    loadData() {
      this.fetchCampaigns({
        pageNumber: this.pageNumber,
        text: this.searchText,
      });
    },
    showNextPage() {
      this.pageNumber += 1;
    },
    showPreviousPage() {
      this.pageNumber -= 1;
    },
    showNewModal() {
      /* eslint-disable */
      this.$eventBus.emit('showModal', [
        {
          bind: {
            is: FormBuilder,
            fields: [
              {
                name: 'title',
                label: this.$t(
                  'admin.campaignListScreen.newModalForm.title.label'
                ),
                placeholder: this.$t(
                  'admin.campaignListScreen.newModalForm.title.placeholder'
                ),
              },
              {
                name: 'description',
                type: 'text',
                label: this.$t(
                  'admin.campaignListScreen.newModalForm.description.label'
                ),
                placeholder: this.$t(
                  'admin.campaignListScreen.newModalForm.description.placeholder'
                ),
              },
              {
                name: 'location',
                type: 'text',
                label: this.$t(
                  'admin.campaignListScreen.newModalForm.location.label'
                ),
                placeholder: this.$t(
                  'admin.campaignListScreen.newModalForm.location.placeholder'
                ),
              },
              {
                name: 'deadline',
                type: 'date',
                label: this.$t(
                  'admin.campaignListScreen.newModalForm.deadline.label'
                ),
              },
            ],
            nestedFields: [
              {
                name: 'resources',
                fields: [
                  {
                    name: 'name',
                    label: this.$t(
                      'admin.campaignListScreen.newModalForm.resources.name.label'
                    ),
                    placeholder: this.$t(
                      'admin.campaignListScreen.newModalForm.resources.name.placeholder'
                    ),
                  },
                  {
                    name: 'type',
                    type: 'radio',
                    labels: [
                      this.$t(
                        'admin.campaignListScreen.newModalForm.resources.type.0'
                      ),
                      this.$t(
                        'admin.campaignListScreen.newModalForm.resources.type.1'
                      ),
                    ],
                    options: [0, 1],
                  },
                ],
              },
            ],
          },
          on: {
            submit: this.handleNewCampaign,
            cancel: () => this.$eventBus.emit('hideModal'),
          },
        },
      ]);
      /* eslint-enable */
    },
    handleNewCampaign(payload) {
      this.createCampaign(payload).then(() => {
        this.$eventBus.emit('hideModal');
      });
    },
  },
  watch: {
    pageNumber() {
      this.loadData();
    },
    searchText() {
      this.pageNumber = 0;
      this.loadData();
    },
  },
};
</script>

<style lang="scss" scoped>
#campaign-list-screen {
}
</style>
