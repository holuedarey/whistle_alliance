export interface LoanProductDto {
    status: string
    message: string
    content: Content[]
}

export interface Content {
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