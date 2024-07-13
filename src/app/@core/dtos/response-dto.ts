export class ResponseDto<T> {
    status!: string;
    data?: T;
    content?: any;
    message?: string;
    token?: string;
    channel?:T;
    error?: T;
    monthlyBreakdown?:T;


}
