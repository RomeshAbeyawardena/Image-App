export interface IEnvironmentVariables {
    readonly fileList:string;
}

export class EnvironmentVariables implements IEnvironmentVariables {
    static readonly Default:IEnvironmentVariables = new EnvironmentVariables("files.json"); 
    readonly fileList: string;
    constructor(fileList: string){
        this.fileList = fileList;
    }
}