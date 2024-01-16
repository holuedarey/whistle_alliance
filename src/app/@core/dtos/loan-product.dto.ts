export interface LoanProductDtos {
    status: string
    message: string
    // content: Content[]
}

export interface LoanProductDto {
    id: number
    productName: string
    productDescription: string
    rate: number
    maxAmount: number
    minAmount: number
    productExpires: boolean
    isActive: boolean
    expireDate: string
}