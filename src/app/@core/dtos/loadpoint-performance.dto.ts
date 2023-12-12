export interface LoadPointPerformanceDto {
    totalEnergySupplied: number;
    totalEnergyValue: number;
    itemList: ItemList[]
}

interface ItemList{
    id: string; 
    name: string;
    meterNumber: number;
    energySupplied: number;
    energyValue: number;
    readingPeriod: string;
    ReadingPeriodString: string;
}