<template>
    <div class="flex flex-col gap-2 my-5">
        Upload Files
        <FileUpload ref="fileupload" mode="basic" class="h-2 p-5" customUpload multiple auto
            accept="image/*,audio/*,video/*,application/pdf" :maxFileSize="10000000" @select="addFile">
        </FileUpload>
        <div class="flex flex-wrap gap-5 p-5 bg-gray-100 border-2 border-black rounded-md" v-if="filesModel.length > 0">
            <div v-tooltip="file.name" v-for="file in filesModel" :key="file.name" class="relative grid bg-gray-400 border-2 border-black w-14 h-14 place-content-center"> 
                <img :src="file.objectURL" class="w-full h-full" alt="" v-if="isImage(file)">
                <i class="w-full h-full pi pi-volume-up" severity="secondary" style="font-size: 2rem;" v-else-if="isAudio(file)"></i>
                <i class="w-full h-full pi pi-file" severity="secondary" style="font-size: 2rem;" v-else></i>
                <Button
                    icon="pi pi-times" class="absolute w-4 h-4 -top-2 -right-2" severity="danger" @click="removeFile(file)">
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs, defineProps, ref } from "vue";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import Tooltip from "primevue/tooltip";

const filesModel = defineModel( "files" );
const removeFile = ( file ) => {
    const index = filesModel.value.indexOf( file );
    filesModel.value.splice( index, 1 );
};
const addFile = ( file ) => {
    filesModel.value.push( file.files[0] );
    console.log(file)
};
const isImage = ( file ) => {
    return file.name.includes( ".jpg" ) || file.name.includes( ".png" ) || file.name.includes( ".jpeg" );
};
const isAudio = (file) => {
    return file.name.includes(".mp3") || file.name.includes(".wav") || file.name.includes(".ogg");
};
</script>