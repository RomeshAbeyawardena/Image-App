import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FileUtility } from "../file-utility";
import { IImageFile } from "../image";
import { ImageLoader } from "../image-loader";
export const createimageStore = defineStore("image-store", () => {
    const imageLoader = ref(new ImageLoader());
    const fileUtility = ref(new FileUtility());
    const files = ref<Array<string>>();
    const fileIndex = ref(0);

    async function getFiles(fileList:string):Promise<string[]> {
        const storedFiles = await imageLoader.value.getFiles(fileList);
        files.value = storedFiles;
        return storedFiles;
    }

    const currentImage = computed(() => {
        let index = fileIndex.value;

        index = imageLoader.value.getNextIndex(index);

        if(index != fileIndex.value){
            fileIndex.value = index;
        }

        const file = getFileByIndex(fileIndex.value);

        if(file == undefined){
            return {} as IImageFile;
        }

        return {
            fileName: file,
            name: fileUtility.value.getFileName(file)
        } as IImageFile;
    });

    function getFileByIndex(index:number):string|undefined
    {
        return imageLoader.value.getNextFile(index, files.value);
    }

    function increment() {
        fileIndex.value++;
    }

    function decrement() {
        fileIndex.value--;
    }

    return {imageLoader, fileUtility, currentImage, fileIndex, files, increment, decrement, getFiles, getFileByIndex};
});