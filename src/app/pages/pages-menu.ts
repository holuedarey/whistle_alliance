import { NbMenuItem } from '@nebular/theme';
import { GlobalResources } from '../@core/maps/global-resources';
import { PagesResources } from './pages-resources';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: GlobalResources.get(PagesResources.DashboardView)?.route,
    home: true,
  },
  {
    title: 'Repayment',
    link: GlobalResources.get(PagesResources.UsersView)?.route,
    icon: 'credit-card-outline',
  },
  {
    title: 'Settings',
    link: GlobalResources.get(PagesResources.ConfigView)?.route,
    icon: 'settings-outline',
  }, 
  {
    title: 'Notification',
    link: GlobalResources.get(PagesResources.NotificationView)?.route,
    icon: 'bell-outline'
  }


];
