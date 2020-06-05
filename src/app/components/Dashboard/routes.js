import Account from './Account/Account';
import Affiliate from './Affiliate/Affiliate';
import ApiSecret from './Api-Secret/ApiSecret';
import Security from './Security/Security';
import AffiliateContent from '../../containers/dashboard/affiliate/AffiliateContent';

const dashboardRoutes = [
  {
    path: '/balances',
    name: 'Balances',
    heading: '',
    component: '',
    layout: '/dashboard',
  },
  {
    path: '/deposits',
    name: 'Deposit',
    heading: '',
    component: '',
    layout: '/dashboard',
  },
  {
    path: '/address',
    name: 'Address',
    heading: '',
    component: '',
    layout: '/dashboard',
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    heading: '',
    component: '',
    layout: '/dashboard',
  },
  {
    path: '/account',
    name: 'My Profile',
    heading: 'Account',
    component: Account,
    layout: '/dashboard',
  },
  {
    path: '/security',
    name: 'Security',
    heading: 'Security',
    component: Security,
    layout: '/dashboard',
  },
  {
    path: '/affiliate',
    name: 'Affiliate',
    heading: 'Affiliate',
    component: Affiliate,
    layout: '/dashboard',
  },
  {
    path: '/apiSecret',
    name: 'Get Api Secret',
    heading: 'Api Credentials',
    component: ApiSecret,
    layout: '/dashboard',
  },
];

export default dashboardRoutes;
