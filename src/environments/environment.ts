// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AccessControl } from "./access-control-config";

export const environment = {
  production: false,
  appUrl: 'https://argusapp-web.test.vggdev.com',
  apiUrl: 'http://38.242.128.143:8989/api',
  apiDomain: 'argusgateway-api.test.vggdev.com',
  googleMapKey: 'AIzaSyDnwVXdPAfWb3f2OwfsimrxuLIPhHtYZcc',
  accessControlConfig: AccessControl[0],
  paginationLength: 100,
  recentLength: 5,

}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
