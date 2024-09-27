<template>
    <div>
        <Button icon="pi pi-close" class="overflow-ellipsis" severity="danger" @click="removeFile(file)" v-for="file in filesModel" :key="file.name">
            {{ file.name }}
        </Button>
        <FileUpload ref="fileupload" mode="basic" class="h-2 p-2" :custom-upload="true" name="demo[]" url="/api/upload"
            accept="image/*,audio/*,video/*,application/pdf" :maxFileSize="1000000" @select="addFile">
        </FileUpload>
    </div>
</template>

<script setup>
import { toRefs, defineProps, ref } from "vue";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

const filesModel = defineModel("files");
const removeFile = (file) => {
    const index = filesModel.value.indexOf(file);
    filesModel.value.splice(index, 1);
};
const addFile = (file) => {
    filesModel.value.push(file.files[0]);
};
</script>