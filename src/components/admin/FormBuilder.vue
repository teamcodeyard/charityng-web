<template>
  <div class="form-builder">
    <div v-for="(field, index) of fields" :key="index" class="form-group">
      <label>{{ field.label }}</label>
      <input
        v-if="isInput(field.type)"
        class="form-control"
        :type="field.type || 'text'"
        :placeholder="field.placeholder"
        v-model="fieldValues[field.name]"
      />
      <div
        class="form-check"
        v-for="(option, jindex) of field.options"
        :key="jindex"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="`radio-${field.name}-${jindex}`"
          :value="option"
          v-model="fieldValues[field.name]"
        />
        <label class="form-check-label" :for="`radio-${field.name}-${jindex}`">
          {{ field.labels[jindex] }}
        </label>
      </div>
    </div>
    <button
      class="btn btn-primary m-3"
      @click="submit"
      v-t="submitButtonTextKey"
    ></button>
    <button
      class="btn btn-danger m-3"
      @click="cancel"
      v-t="cancelButtonTextKey"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'FormBuilder',
  props: {
    fields: {
      type: Array,
    },
    nestedFields: {
      type: Array,
    },
    submitButtonTextKey: {
      type: String,
      default: 'admin.general.buttons.submit',
    },
    cancelButtonTextKey: {
      type: String,
      default: 'admin.general.buttons.cancel',
    },
  },
  components: {},
  data: () => ({
    fieldValues: {},
  }),
  methods: {
    submit() {
      this.$emit('submit', this.fieldValues);
    },
    cancel() {
      this.$emit('cancel');
    },
    isInput(fieldType) {
      return ['text', 'password', 'number', 'date', undefined].includes(fieldType);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
