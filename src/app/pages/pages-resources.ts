import { ResourceNavModel } from "../@core/models/resource-nav.model";

export enum PagesResources {
    DashboardView = 'pages:dashboard-view',
    UsersView = 'pages:users-view',
    ConfigView = 'pages:config-view',
    NotificationView = 'pages:notification-view',
    HistoryView = 'pages:history-view',

}

export const PagesResourcesNavMap = new Map<PagesResources, ResourceNavModel>([
    [
        PagesResources.DashboardView,
        {
            route: `/app/dashboard`,
            path: 'dashboard'
        }
    ],
    [
        PagesResources.UsersView,
        {
            route: `/app/users`,
            path: 'users'
        }
    ],
    [
        PagesResources.ConfigView,
        {
            route: `/app/config`,
            path: 'config'
        }
    ],
    [
        PagesResources.NotificationView,
        {
            route: `/app/notification`,
            path: 'notification'
        }
    ],
    [
        PagesResources.HistoryView,
        {
            route: `/app/history`,
            path: 'history'
        }
    ],
])
