import { ResourceNavModel } from "./@core/models/resource-nav.model";

export enum AppResources {
    LandingView = 'app:landing-view',
    AuthView = 'app:auth-view',
    AppView = 'app:app-view',
    ErrorView = 'app:error-view'
}

export const AppResourcesNavMap = new Map<AppResources, ResourceNavModel>([
    [
        AppResources.LandingView,
        {
            route: '/',
            path: ''
        }
    ],
    [
        AppResources.AuthView,
        {
            route: '/auth',
            path: 'auth'
        }
    ],
    [
        AppResources.AppView,
        {
            route: '/app',
            path: 'app'
        }
    ],
    [
        AppResources.ErrorView,
        {
            route: '/error',
            path: 'error'
        }
    ],
]);
