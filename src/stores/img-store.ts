import { HttpStatusCode } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { Configuration, DefaultApi, Image, SortOrder } from "../api";

export const createImageStore = defineStore("image-store", () => {
    const api = ref(new DefaultApi(new Configuration({})));
    const currentIndex = ref(0);
    const pageSize = ref(10);
    const cache = ref(new Array<Image>());

    function populateCache(images: Image[] | null | undefined){
        if(images == null || images == undefined) {
            return;
        }

        images.forEach(f => {
            if(f.index != undefined && cache.value[f.index] == undefined)
            {
                cache.value.splice(f.index, 1, f)
            }
        });
    }

    async function loadImages() {
        const currentPage = currentIndex.value == 0 
            ? 1 
            : Math.abs(pageSize.value / currentIndex.value);
        
        const response = 
            await api.value.apiImageGet(currentPage, pageSize.value, ["Index"], SortOrder.Ascending);
        
        if((response.status == HttpStatusCode.Ok 
            || response.status == HttpStatusCode.Accepted
            || response.status == HttpStatusCode.NotModified)
            && response.data.isSuccessful) {
                
                if(cache.value == undefined)
                {
                    cache.value = new Array<Image>(response.data.totalItems ?? 0);
                }
                else {
                    populateCache(response.data.results);
                }
                return response.data.results;
        }

        return null;
    }
    
    return {
        cache, currentIndex, pageSize,
        loadImages
    }
});