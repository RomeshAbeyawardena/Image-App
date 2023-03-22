import { IImageFile } from "../image";

export interface IBackend {
    set(key: string, value:any):void;
    get<T>(key:string):T | null;
    load(imageFiles:IImageFile[]):number;
    save(imageFiles:IImageFile[]):number;
}

export class Backend implements IBackend {
    load(imageFiles: IImageFile[]): number {
        let indexCount = 0;
        imageFiles.forEach(f => {
            const savedImage = this.get<IImageFile>(f.fileName);

            if(savedImage == null) return;

            f.comment = savedImage.comment;
            indexCount++;
        });

        return indexCount;
    }
    
    save(imageFiles: IImageFile[]): number {
        const imagesToSave = imageFiles.filter(i => i.comment.length);

        imagesToSave.forEach(i => this.set(i.fileName, i));
        return imageFiles.length;
    }
    get<T>(key: string): T | null {
        const value = localStorage.getItem(key);
        if(value == null || value == undefined)
        {
            return null;
        }

        return JSON.parse(value) as T;
    }
    set(key: string, value: any): void {
        if(value == null || value == undefined)
        {
            return;
        }

        localStorage.setItem(key, JSON.stringify(value));
    }
}