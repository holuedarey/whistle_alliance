import { ResourceNavModel } from "../@core/models/resource-nav.model";

export enum PagesResources {
    DashboardView = 'pages:dashboard-view',
    UsersView = 'pages:users-view',
    RepaymentView = 'pages:repayment-view',
    ConfigView = 'pages:config-view',
    NotificationView = 'pages:notification-view',
    HistoryView = 'pages:history-view',
    Overview = 'pages:overview-view',
    LoanView = 'pages:loan-view',
    LoanDetailsView = 'pages:loan-details-view',
    LoanProductView = 'pages:product-view',
    LoanProductsView = 'pages:products-view',
    UserTransactionHistoryView = 'pages:transaction-history-view',



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
        PagesResources.RepaymentView,
        {
            route: `/app/repayment`,
            path: 'repayment'
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
    [
        PagesResources.Overview,
        {
            route: `/app/admin/overview`,
            path: 'admin/overview'
        }
    ],
    [
        PagesResources.UsersView,
        {
            route: `/app/admin/users`,
            path: 'admin/users'
        }
    ],
    [
        PagesResources.LoanView,
        {
            route: `/app/admin/loan`,
            path: 'admin/loan'
        }
    ],
    [
        PagesResources.LoanProductView,
        {
            route: `/app/admin/loan-product`,
            path: 'admin/loan-product'
        }
    ],
    [
        PagesResources.LoanProductsView,
        {
            route: `/app/admin/loan-products`,
            path: 'admin/loan-products'
        }
    ],
    [
        PagesResources.LoanDetailsView,
        {
            route: `/app/admin/loan-details`,
            path: 'admin/loan-details'
        }
    ],
    [
        PagesResources.UserTransactionHistoryView,
        {
            
            route: `/app/admin/users/transaction`,
            path: 'users/transaction'
        }
    ],
])
