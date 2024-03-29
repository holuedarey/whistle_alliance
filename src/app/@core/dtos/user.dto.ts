export interface UserDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    status: string;
    ssoUserId: string;
    ssoRole: string;
    role: string;
    client: string;
    clientId: string;
    roleId: string;
    deActivatedBy: null;
    dateDeactivated: null;
    id: string;
    createdDate:string,
    active:boolean,
    loanSummary?:[]
}
