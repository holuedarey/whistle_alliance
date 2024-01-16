export interface UserModel {
    email: string;
    id?:number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    ssoRole: string;
    appRole: string;
    clientId: string;
}
