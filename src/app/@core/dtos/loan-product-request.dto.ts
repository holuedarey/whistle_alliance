export interface LoanProductRequestDto {
    expireDate: string,
    isActive: boolean,
    maxAmount: Number,
    minAmount: Number,
    productDescription: string,
    productExpires: boolean,
    productName: string,
    rate: Number
}