export enum MeterReadingErrorEnum {
    FaultyFeeder = 1,
    AccountInformationMismatch,
    Disconnected,
    NoPower,
    CustomerOnPrepaid,
    BurntMeter,
    BuildingVacant,
    NoAccess,
    NonItronMeter,
    CustomerRelocated,
    Nometer,
    PoorPictureQuality,
    AddressNotFound
}


export const ErrorLabel = new Map<number, string>([
    [MeterReadingErrorEnum.FaultyFeeder, 'Faulty Feeder'],
    [MeterReadingErrorEnum.AccountInformationMismatch, 'Account Information Mismatch'],
    [MeterReadingErrorEnum.Disconnected, 'Disconnected'],
    [MeterReadingErrorEnum.NoPower, 'No Power'],
    [MeterReadingErrorEnum.CustomerOnPrepaid, 'Customer On Prepaid'],
    [MeterReadingErrorEnum.BurntMeter, 'Burnt Meter'],
    [MeterReadingErrorEnum.BuildingVacant, 'Building Vacant'],
    [MeterReadingErrorEnum.NoAccess, 'No Access'],
    [MeterReadingErrorEnum.NonItronMeter, 'Non Itron Meter'],
    [MeterReadingErrorEnum.CustomerRelocated, 'Customer Relocated'],
    [MeterReadingErrorEnum.Nometer, 'No meter'],
    [MeterReadingErrorEnum.PoorPictureQuality, 'Poor Picture Quality'],
    [MeterReadingErrorEnum.AddressNotFound, 'Address Not Found'],
]);

