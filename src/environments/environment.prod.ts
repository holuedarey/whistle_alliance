import { AccessControl } from "./access-control-config";

const environments = [
  {
    production: true,
    appUrl: 'https://argusapp-web.test.vggdev.com',
    apiUrl: 'https://loanapi.whistlesalliance.com:4433/api',
    apiDomain: 'argusgateway-api.test.vggdev.com',
    googleMapKey: 'AIzaSyDnwVXdPAfWb3f2OwfsimrxuLIPhHtYZcc',
    accessControlConfig: AccessControl[0],
    paginationLength: 100,
    recentLength: 5,

  },
  {
    production: true,
    appUrl: 'https://argusapp.staging.vggdev.com',
    apiUrl: 'https://loanapi.whistlesalliance.com:4433/api',
    apiDomain: 'argusgateway-api.staging.vggdev.com',
    googleMapKey: 'AIzaSyDnwVXdPAfWb3f2OwfsimrxuLIPhHtYZcc',
    accessControlConfig: AccessControl[0],
    paginationLength: 100,
  },
];

export const environment = environments.find(e => window.location.origin === e.appUrl) ?? environments[0];
