export interface PowerSourceAnalyticsTableDto {
    totalEnergySupplied: number;
    totalEnergyValue: number;
    tableData: TableData[]
}

interface TableData {
    id: string;
    name: string;
    energySupplied: number;
    energyValue: number
    from: string;
    to: string;
}