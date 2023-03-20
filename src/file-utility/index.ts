export interface IFileUtility {
    getFileName(file: string): string | undefined;
}

export class FileUtility implements IFileUtility {
    getFileName(file: string): string | undefined {
        if (file == undefined || file == null) {
            return undefined;
        }

        var fileNameSegments = file.split("/");

        return fileNameSegments.at(fileNameSegments.length - 1);
    }
}