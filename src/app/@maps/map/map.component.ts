import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, GoogleMap, MapMarker } from '@angular/google-maps';
import { NbThemeService, NbLayoutRulerService } from '@nebular/theme';
import { AnimationOptions } from 'ngx-lottie';
import { map, switchMap, takeWhile } from 'rxjs/operators';
import { MapService } from 'src/app/@core/data-services/map.service';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { MapMarkerModel } from 'src/app/@core/models/map-marker.model';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input()
  public set markerModels(v: MapMarkerModel[]) {
    this.updateMarkerPaint(v);
    this.updateMarkerBounds();
  }
  markers: MapMarkerModel[] = [];

  @Input()
  height = '300px';

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  apiLoaded = false;
  isLive = true;
  showLoadingMap = true;

  darkAnim: AnimationOptions = {
    path: '/assets/animations/map-loading-dark.json',
  };

  lightAnim: AnimationOptions = {
    path: '/assets/animations/map-loading-light.json',
  };
  mapOptions: google.maps.MapOptions = {};

  infoWindowContent: any;

  constructor(
    public themeService: NbThemeService,
    public layoutRuler: NbLayoutRulerService,
    private mapService: MapService,
    private ls: SecureLocalStorageService
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.apiLoaded = await this.mapService.loadMapApi().toPromise();
    this.markers = [{
      title: 'title',
      position: new google.maps.LatLng(6.4698385, 3.5711476),
      options: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#ff3d71',
          fillOpacity: 1,
          strokeWeight: 1,
          scale: 8.5,
        }
      },
      info: ''
    }]

    await this.setupMapData();
    this.onThemeChange();
  }

  async setupMapData(): Promise<void> {
    this.mapOptions = {
      center: new google.maps.LatLng(6.4698385, 3.5711476),
      zoom: 5,
      fullscreenControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false
    };
    this.updateMarkerBounds();
  }

  openInfoWindow(marker: MapMarker): void {
    this.infoWindowContent = 'something'
    this.infoWindow.open(marker);
  }

  onThemeChange() {
    this.themeService.onThemeChange()
      .pipe(
        takeWhile(() => this.isLive),
        map((color) => {
          this.updateMarkerPaint(this.markers, color.name);
        }),
        switchMap(() => this.themeService.getJsTheme())
      )
      .subscribe(config => {
        if (this.googleMap) {
          this.googleMap.googleMap?.setOptions({ styles: JSON.parse(config.variables?.maps as string) });
        } else {
          this.mapOptions = { ...this.mapOptions, styles: JSON.parse(config.variables?.maps as string) }
        }
      })
  }

  updateMarkerPaint(newMarkers: MapMarkerModel[], color = this.ls.get(LocalStorageKey.THEME.toString())) {
    const markers = [...newMarkers];
    this.markers = [];

    // repaint markers on map view
    setTimeout(() => {
      this.markers = [...markers.map(m => {
        (m.options.icon as google.maps.Symbol).strokeColor = color === 'dark' ? 'white' : 'black'
        return m;
      })];
    }, 0);
  }

  updateMarkerBounds() {
    // update map bounds with marker position
    setTimeout(() => {
      const bound = new google.maps.LatLngBounds(this.markers[0]?.position);
      this.markers.forEach(a => {
        bound.extend(a.position);
        this.googleMap.fitBounds(bound);
      });
    }, 10);
  }

  ngOnDestroy(): void {
    this.isLive = false;
  }

}
