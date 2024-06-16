import { NbMenuItem } from '@nebular/theme';
import { GlobalResources } from '../@core/maps/global-resources';
import { PagesResources } from './pages-resources';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Overview',
    icon: 'grid-outline',
    link: GlobalResources.get(PagesResources.Overview)?.route,
    home: true,
  },
  {
    title: 'Users',
    icon: 'person-outline',
    link: GlobalResources.get(PagesResources.UsersView)?.route,
    home: true,
    hidden: false
  },
  {
    title: 'Loans',
    icon: 'file-text-outline',
    link: GlobalResources.get(PagesResources.LoanView)?.route,
    home: true,
    hidden: false
  },
  {
    title: 'Products',
    icon: 'briefcase-outline',
    link: GlobalResources.get(PagesResources.LoanProductsView)?.route,
    home: true,
    hidden: false
  },
  {
    title: 'Dashboard',
    icon: 'home',
    link: GlobalResources.get(PagesResources.DashboardView)?.route,
    home: true,
  },
  {
    title: 'Loans',
    link: GlobalResources.get(PagesResources.RepaymentView)?.route,
    icon: 'credit-card-outline',
  },
  {
    title: 'Settings',
    link: GlobalResources.get(PagesResources.ConfigView)?.route,
    icon: 'settings-outline',
  }, 
  {
    title: 'Notifications',
    link: GlobalResources.get(PagesResources.NotificationView)?.route,
    icon: 'bell-outline'
  }

];
