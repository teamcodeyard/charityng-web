<template>
  <div id="user-list-screen">
    <base-input
      v-model="searchText"
      type="text"
      :placeHolder="$t('userListScreen.search.placeholder')"
    />
    <base-list
      v-if="items"
      :items="items.list"
      :headers="headers"
      :pageNumber="pageNumber"
      :pageCount="items.pageCount"
      @previous="showPreviousPage"
      @next="showNextPage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseInput from '@/components/elements/BaseInput.vue';
import BaseList from '@/components/elements/BaseList.vue';

export default {
  name: 'UserListScreen',
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
      items: 'admin.users/users',
    }),
    headers() {
      return [
        {
          translationKey: 'admin.users.list.header.id',
          path: '_id',
          link: (value) => `/admin/users/${value}`,
        },
        {
          translationKey: 'admin.users.list.header.firstName',
          path: 'firstName',
        },
        {
          translationKey: 'admin.users.list.header.lastName',
          path: 'lastName',
        },
        {
          translationKey: 'admin.users.list.header.status',
          path: 'status',
          format: (value) => {
            if (value === 0) {
              return this.$t('admin.users.list.status.inactive');
            }
            return this.$t('admin.users.list.status.active');
          },
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      fetchUsers: 'admin.users/fetchUsers',
    }),
    loadData() {
      this.fetchUsers({ pageNumber: this.pageNumber, text: this.searchText });
    },
    showNextPage() {
      this.pageNumber += 1;
    },
    showPreviousPage() {
      this.pageNumber -= 1;
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
#user-list-screen {
}
</style>
