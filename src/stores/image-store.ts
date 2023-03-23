import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Backend, IBackend } from "../backend";
import { FileUtility, IFileUtility } from "../file-utility";
import { IImageFile, ImageFile } from "../image";
import { IImageLoader, ImageLoader } from "../image-loader";
import { createMainStore } from "./main";

export const createimageStore = defineStore("image-store", () => {
    const imageLoader = ref<IImageLoader>(new ImageLoader());
    const fileUtility = ref<IFileUtility>(new FileUtility());
    const imageFiles = ref(new Array<IImageFile>());
    const backend = ref<IBackend>(new Backend());
    const files = ref(new Array<string>());
    const fileIndex = ref(0);
    const store = createMainStore();

    async function getFiles(fileList: string): Promise<string[]> {
        const storedFiles = await imageLoader.value.getFiles(fileList);

        const mappedFiles = storedFiles.map((f, i) => (ImageFile
            .create(i, f, fileUtility.value.getFileName(f), "", undefined)));
        imageFiles.value = mappedFiles;
        files.value = storedFiles;

        if (backend.value.load(imageFiles.value)) {
            store.notify("Backend", "Data loaded", 3000);
        }

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

    function getImageFileByIndex(index: number): IImageFile {
        if (imageFiles.value == undefined) {
            return { index: -1, fileName: "", name: "", comment: "" };
        }

        return imageFiles.value.at(index) ?? { index: -1, fileName: "", name: "", comment: "" };
    }

    function saveChanges() {
        if (backend.value.save(imageFiles.value)) {
            store.notify("Backend", "Changes saved", 3000);
        }
    }

    async function increment() {
        fileIndex.value++;
    }

    async function decrement() {
        fileIndex.value--;
    }

    return {
        backend,
        imageLoader, imageFiles, fileUtility, currentImage, fileIndex, files,
        increment, decrement, getFiles, getImageFileByIndex, getFileByIndex,
        saveChanges
    };
});