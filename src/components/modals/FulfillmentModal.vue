<template>
  <div id="fulfillment-modal" v-if="campaign">
    <div class="row">
      <div class="col-12">
        <div class="title" v-t="'public.fulfillmentModal.title'"></div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="sub-title" v-t="'public.fulfillmentModal.subTitle'"></div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-6">
        <select class="form-control" v-model="resourceId">
          <option
            v-for="(resource, index) of campaign.resources"
            :key="index"
            :value="resource._id"
          >
            {{ resource.name }}
          </option>
        </select>
      </div>
      <div class="col-6">
        <input v-model="quantity" type="number" class="form-control" />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <div
          class="message-title"
          v-t="'public.fulfillmentModal.messageTitle'"
        ></div>
      </div>
      <div class="col-12">
        <textarea v-model="message" class="form-control"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <base-button
          :title="$t('public.fulfillmentModal.submitButton.title')"
          @clicked="submit"
          :isDisabled="isDisabled"
        />
      </div>
      <div class="col-12">
        <div
          @click="cancel"
          class="cancel"
          v-t="'public.fulfillmentModal.cancelButton.title'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/elements/BaseButton.vue';

export default {
  name: 'FulfillmentModal',
  components: {
    BaseButton,
  },
  props: {
    campaign: { type: Object },
  },
  data: () => ({
    resourceId: undefined,
    quantity: undefined,
    message: undefined,
  }),
  created() {},
  computed: {
    isDisabled() {
      /* eslint-disable */
      return (
        !this.message ||
        this.message.length < 13 ||
        this.quantity < 1 ||
        !this.resourceId
      );
      /* eslint-enable */
    },
  },
  methods: {
    submit() {
      this.$emit('submit', {
        resources: [
          { resourceId: this.resourceId, quantity: Number(this.quantity) },
        ],
        message: this.message,
      });
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
#fulfillment-modal {
  padding: 42px;
  width: 889px;
  .title {
    font-family: Ubuntu;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: center;
    color: #000;
  }
  .sub-title {
    font-family: Ubuntu;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    letter-spacing: normal;
    text-align: center;
    color: #606060;
    padding: 10px;
  }
  .message-title {
    font-family: Ubuntu;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    margin: 5px 0;
  }
  .cancel {
    margin-top: 15px;
    text-align: center;
    color: var(--secondaryColor);
    cursor: pointer;
  }
}
</style>
