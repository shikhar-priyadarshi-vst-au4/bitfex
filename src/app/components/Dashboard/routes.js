import Account from './Account/Account';
import Affiliate from './Affiliate/Affiliate';
import ApiSecret from './Api-Secret/ApiSecret';
import Security from './Security/Security';
import Balances from './Exchange-Wallet/Balances/Balances';
import Deposit from './Exchange-Wallet/Deposit/Deposit';
import Withdraw from './Exchange-Wallet/Withdraw/Withdraw';

const dashboardRoutes = [
  {
    path: '/balances',
    name: 'Balances',
    heading: 'Balances',
    component: Balances,
    layout: '/dashboard',
  },
  {
    path: '/deposits',
    name: 'Deposit',
    heading: 'Deposit',
    component: Deposit,
    layout: '/dashboard',
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    heading: 'Withdraw BTC',
    component: Withdraw,
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
