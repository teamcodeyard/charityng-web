<template>
  <div>
    <div v-bind="getRootProps()">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <button class="btn btn-primary" @click="open">Open</button>
  </div>
</template>

<script>
import { useDropzone } from 'vue3-dropzone';

export default {
  name: 'DropZone',
  setup(props, { emit }) {
    function onDrop(acceptFiles) {
      emit('fileSelected', acceptFiles);
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    return {
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
};
</script>
