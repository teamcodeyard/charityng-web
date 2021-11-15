<template>
  <div id="messages-modal" v-if="fulfillments">
    <div class="row header-row pb-2">
      <div class="col-4">
        <div
          class="fulfillments-title"
          v-t="'messagesModal.fulfillments.title'"
        ></div>
      </div>
      <div class="col-8 d-flex justify-content-end">
        <base-icon
          imageUrl="/images/icons/cross.svg"
          @click="closeModal"
          class="close-icon"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div
          v-for="(fulfillment, index) of fulfillments"
          :key="index"
          :class="classForItem(index)"
          @click="select(index)"
        >
          <div class="campaign-title">
            {{ fulfillment.campaign.title }}
          </div>
          <div class="message-counter">
            {{ fulfillment.messages.length }}
            {{ $t('messagesModal.fulfillments.messageCounter') }}
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="row messages-row" ref="messagesRow">
          <div class="col-12">
            <div
              v-for="(message, index) of selectedFulfillment.messages"
              :key="index"
              class="message-item"
            >
              <div class="row">
                <div class="col-6">
                  <div class="user-name">
                    {{ message.user.firstName }} {{ message.user.lastName }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="date d-flex justify-content-end">
                    {{ moment(message.createdAt).format('dddd, MMMM DoYYYY') }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 message-text">
                  {{ message.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <textarea v-model="message" class="form-control"></textarea>
          </div>
          <div class="col-12 mt-5 mb-3 d-flex justify-content-end">
            <base-button
              class="send-button"
              :title="$t('messagesModal.messages.sendButton.title')"
              @clicked="sendMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import BaseButton from '@/components/elements/BaseButton.vue';
import BaseIcon from '@/components/elements/BaseIcon.vue';

export default {
  name: 'MessagesModal',
  components: {
    BaseButton,
    BaseIcon,
  },
  data: () => ({
    fulfillments: undefined,
    selectedFulfillmentIndex: 0,
    message: '',
  }),
  created() {
    this.moment = moment;
    this.loadData();
  },
  computed: {
    selectedFulfillment() {
      if (!this.fulfillments || this.fulfillments.length === 0) {
        return undefined;
      }
      return this.fulfillments[this.selectedFulfillmentIndex];
    },
  },
  methods: {
    ...mapActions({
      listFulfilledCampaigns: 'campaigns/listFulfilledCampaigns',
      send: 'campaigns/sendMessage',
    }),
    loadData() {
      // eslint-disable-next-line no-return-assign
      this.listFulfilledCampaigns().then((x) => {
        this.fulfillments = x;
        this.scrollToBottom();
      });
    },
    classForItem(index) {
      return {
        'fulfillment-item': true,
        selected: this.isItemSelected(index),
      };
    },
    isItemSelected(index) {
      return index === this.selectedFulfillmentIndex;
    },
    select(index) {
      this.selectedFulfillmentIndex = index;
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        /* eslint-disable */
        this.$refs.messagesRow.scrollTop =
          this.$refs.messagesRow.scrollHeight -
          this.$refs.messagesRow.clientHeight;
        /* eslint-enable */
      });
    },
    sendMessage() {
      this.send({
        campaignId: this.selectedFulfillment.campaignId,
        fulfillmentId: this.selectedFulfillment._id, // eslint-disable-line
        message: this.message,
      }).then(() => {
        this.message = '';
        this.scrollToBottom();
        this.loadData();
      });
    },
    closeModal() {
      this.$eventBus.emit('hideModal');
    },
  },
};
</script>

<style lang="scss" scoped>
#messages-modal {
  width: 60vw;
  .header-row {
    border-bottom: 1px solid rgba(112, 112, 112, 0.4);
  }
  .fulfillments-title {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }
  .fulfillment-item {
    padding: 20px 0;
    &.selected {
      .campaign-title,
      .message-counter {
        font-weight: bold;
        color: #f64c71;
      }
    }
    .campaign-title {
      cursor: pointer;
      font-family: Ubuntu;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.11;
      letter-spacing: normal;
      text-align: left;
      color: #000;
    }
    .message-counter {
      font-family: Ubuntu;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.67;
      letter-spacing: normal;
      text-align: left;
      color: #7c7c7c;
    }
  }
  .messages-row {
    max-height: 40vh;
    overflow-y: scroll;
    .message-item {
      padding: 10px;
      margin: 10px;
      border-radius: 8px;
      background-color: rgba(112, 112, 112, 0.1);
      .user-name {
        font-family: Ubuntu;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.11;
        letter-spacing: normal;
        text-align: left;
        color: #f64c71;
      }
      .date {
        font-family: Ubuntu;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.67;
        letter-spacing: normal;
        text-align: left;
        color: #7c7c7c;
      }
      .message-text {
        font-family: Ubuntu;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.67;
        letter-spacing: normal;
        text-align: left;
        color: #7c7c7c;
      }
    }
  }
  .send-button {
    width: 40%;
  }
  .close-icon {
    ::v-deep img {
      max-height: 25px;
      cursor: pointer;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
