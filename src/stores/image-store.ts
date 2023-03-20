import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FileUtility } from "../file-utility";
import { IImageFile } from "../image";
import { ImageLoader } from "../image-loader";
export const createimageStore = defineStore("image-store", () => {
    const imageLoader = ref(new ImageLoader());
    const fileUtility = ref(new FileUtility());
    const imageFiles = ref(new Array<IImageFile>());
    const files = ref(new Array<string>());
    const fileIndex = ref(0);

    async function getFiles(fileList: string): Promise<string[]> {
        const storedFiles = await imageLoader.value.getFiles(fileList);

        const mappedFiles = storedFiles.map((f, i) => ({
            index: i,
            fileName: f,
            name: fileUtility.value.getFileName(f)
        } as IImageFile));
        imageFiles.value = mappedFiles;
        files.value = storedFiles;
        return storedFiles;
    }

    const currentImage = computed(() => {
        let index = fileIndex.value;

        index = imageLoader.value.getNextIndex(index, files.value);

        if (index != fileIndex.value) {
            fileIndex.value = index;
        }

        return getImageFileByIndex(fileIndex.value);
    });

    function getFileByIndex(index: number): string | undefined {
        return imageLoader.value.getNextFile(index, files.value);
    }

    function getImageFileByIndex(index: number): IImageFile | undefined {
        if (imageFiles.value == undefined) {
            return undefined;
        }

        return imageFiles.value.at(index);
    }

    function increment() {
        fileIndex.value++;
    }

    function decrement() {
        fileIndex.value--;
    }

    return {
        imageLoader, imageFiles, fileUtility, currentImage, fileIndex, files,
        increment, decrement, getFiles, getImageFileByIndex, getFileByIndex
    };
});