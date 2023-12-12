export interface XlsxWorkerDataModel {
    workbookTemplate: ArrayBuffer;
    data: (string | number)[][];
    encryptPassword?: string;
    fileName: string;
}
