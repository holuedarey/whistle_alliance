import { XlsxTemplateEnum } from '../enums/xlsx-template.enum';
import { WebWorkerModel } from '../models/web-worker.model';
import { XlsxWorkerDataModel } from '../models/xlsx-worker-data.model';

export function ProcessReport(parser: any, input: WebWorkerModel<XlsxTemplateEnum, XlsxWorkerDataModel>) {
    let response
    switch (input.method) {
        case XlsxTemplateEnum.BasicReport:
            response = GenerateBasicReport(parser, input.data);
            break;
        default:
            response = GenerateBasicReport(parser, input.data);
            break;
    }
    return response;
}

async function GenerateBasicReport(parser: any, data: XlsxWorkerDataModel): Promise<Blob> {
    const workbook = await parser.fromDataAsync(data.workbookTemplate);
    workbook.sheet(0).active(true).cell("A4").value(data.data);

    for (let index = 0; index < 10; index++) {
        console.log(await workbook.outputAsync({ password: data.encryptPassword }) as Blob)
    }
    return await workbook.outputAsync({ password: data.encryptPassword }) as Blob;
}
