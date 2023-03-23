export interface IImageFile {
    index: number;
    fileName: string;
    name: string;
    comment?: string;
    lastUpdated?:Date;
}

export class ImageFile implements IImageFile {
    static create(index:number,
            fileName:string,
            name:string | undefined,
            comment:string|undefined,
            lastUpdated:Date|undefined) :IImageFile {
        const image = new ImageFile();
        image.comment = comment;
        image.fileName = fileName;
        image.name = name ?? fileName;
        image.lastUpdated = lastUpdated;

        return image;
    }
    
    index: number = -1;
    fileName: string = "";
    name: string = "";
    comment?: string;
    lastUpdated?:Date;
}