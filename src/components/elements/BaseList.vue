<template>
  <div class="base-list">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" v-for="(col, index) of headers" :key="index">
            {{ $t(col.translationKey) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of items" :key="index">
          <td v-for="(col, index) of headers" :key="index">
            <router-link v-if="col.link" :to="col.link(item[col.path])">
              {{ item[col.path] }}
            </router-link>
            <span v-else-if="col.format">
              {{ col.format(item[col.path]) }}
            </span>
            <span v-else>
              {{ item[col.path] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="hasPagination" class="pagination d-flex justify-content-center">
      <img
        @click="previous"
        :class="previousArrowClass"
        src="/images/icons/previous-arrow.svg"
      />
      <div class="page-number">{{ pageNumber + 1 }}</div>
      <img
        @click="next"
        :class="nextArrowClass"
        src="/images/icons/next-arrow.svg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseList',
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      default: 1,
    },
    hasPagination: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    previousArrowClass() {
      return {
        'previous-arrow': true,
        disabled: !this.hasPreviousPage,
      };
    },
    nextArrowClass() {
      return {
        'next-arrow': true,
        disabled: !this.hasNextPage,
      };
    },
    hasPreviousPage() {
      return this.pageNumber > 0;
    },
    hasNextPage() {
      return this.pageNumber < this.pageCount - 1;
    },
  },
  methods: {
    previous() {
      if (this.hasPreviousPage) {
        this.$emit('previous');
      }
    },
    next() {
      if (this.hasNextPage) {
        this.$emit('next');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base-list {
  .pagination {
    .page-number {
      font-size: 20px;
      font-weight: bold;
    }
    img[class*='-arrow'] {
      cursor: pointer;
      &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }
}
</style>
