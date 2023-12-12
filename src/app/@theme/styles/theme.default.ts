import { NbJSThemeOptions, DEFAULT_THEME as baseTheme } from '@nebular/theme';

const baseThemeVariables = baseTheme.variables;

export const DEFAULT_THEME = {
  name: 'default',
  base: 'default',
  variables: {
    maps: JSON.stringify([
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ] )
  },
} as NbJSThemeOptions;
