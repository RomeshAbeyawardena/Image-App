import Axios from "axios";

export interface IImageLoader 
{
    files?: string[],
    getFiles(fileList: string): Promise<string[]>;
    getNextIndex(index: number, files?: string[]):number;
    getNextFile(index: Number, files?: string[]|null): string|undefined;
}

export class ImageLoader implements IImageLoader
{
    getNextIndex(index: number, files?: string[]): number {
        if(files == null){
            files = this.files ?? new Array<string>();
        }
        
        if(index < 0){
            return files.length - 1;
        }

        if(index > files.length - 1)
        {
            return 0;
        }

        return index;
    }
    files?: string[]
    async getFiles(fileList: string): Promise<string[]> {
        const api = Axios(fileList);
        const response = await api;
        this.files = response.data.files;
        if(this.files != undefined)
        {
            return this.files;
        }

        return new Array<string>();
    }
    getNextFile(index: number, files?: string[]|null): string|undefined {
        if(files == null || files == undefined){
            files = this.files ?? new Array<string>();
        }
        
        var foundFile = files.at(index);

        return foundFile;
    }
    
}