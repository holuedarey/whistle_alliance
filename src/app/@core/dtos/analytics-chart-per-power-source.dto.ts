export interface AnalyticsChartPerPowerSourceDto {
    ReadingPeriodString: string;
    details: Details[]
}

interface Details {
    name: string;
    energySupplied: number; 
    energyValue:number;
}
