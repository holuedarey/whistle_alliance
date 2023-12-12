export interface MapMarkerModel {
    title: string,
    label?: string,
    position: google.maps.LatLng,
    options: google.maps.MarkerOptions,
    info: any
}
