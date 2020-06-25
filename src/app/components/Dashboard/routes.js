import Account from './Account-Preferences/Account/Account';
import Affiliate from './Account-Preferences/Affiliate/Affiliate';
import ApiSecret from './Account-Preferences/Api-Secret/ApiSecret';
import Security from './Account-Preferences/Security/Security';
import Balances from './Exchange-Wallet/Balances/Balances';
import Deposit from './Exchange-Wallet/Deposit/Deposit';
import Withdraw from './Exchange-Wallet/Withdraw/Withdraw';
import DepositCoins from './Exchange-Wallet/Deposit/DepositCoins';
import WithdrawCoins from './Exchange-Wallet/Withdraw/WithdrawCoins';
import FuturesTransfer from './Futures-Wallet/Transfer/FuturesTransfer';
import OptionTransfer from './Options-Wallet/Transfer/OptionTransfer';

const dashboardRoutes = [
  {
    path: '/balances',
    name: 'Balances',
    component: Balances,
    layout: '/dashboard',
    activeDashboard: 'Balances',
  },
  {
    path: '/deposits/BTC',
    name: 'BTC',
    component: DepositCoins,
    layout: '/dashboard',
    activeDashboard: 'Deposit',
  },
  {
    path: '/deposits/USDT',
    name: 'USDT',
    component: DepositCoins,
    layout: '/dashboard',
    activeDashboard: 'Deposit',
  },
  {
    path: '/deposits',
    name: 'Deposit',
    component: Deposit,
    layout: '/dashboard',
    activeDashboard: 'Deposit',
  },
  {
    path: '/withdraw/BTC',
    name: 'BTC',
    component: WithdrawCoins,
    layout: '/dashboard',
    activeDashboard: 'Withdraw',
  },
  {
    path: '/withdraw/USDT',
    name: 'USDT',
    component: WithdrawCoins,
    layout: '/dashboard',
    activeDashboard: 'Withdraw',
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    component: Withdraw,
    layout: '/dashboard',
    activeDashboard: 'Withdraw',
  },
  {
    path: '/account',
    name: 'My Profile',
    component: Account,
    layout: '/dashboard',
    activeDashboard: 'My Profile',
  },
  {
    path: '/security',
    name: 'Security',
    component: Security,
    layout: '/dashboard',
    activeDashboard: 'Security',
  },
  {
    path: '/affiliate',
    name: 'Affiliate',
    component: Affiliate,
    layout: '/dashboard',
    activeDashboard: 'Affiliate',
  },
  {
    path: '/apiSecret',
    name: 'Get Api Secret',
    component: ApiSecret,
    layout: '/dashboard',
    activeDashboard: 'Get Api Secret',
  },
  {
    path: '/futures',
    name: 'Futures Wallet',
    component: FuturesTransfer,
    layout: '/dashboard',
    activeDashboard: 'Futures Wallet',
  },
  {
    path: '/options',
    name: 'Options Wallet',
    component: OptionTransfer,
    layout: '/dashboard',
    activeDashboard: 'Options Wallet',
  },
];

export default dashboardRoutes;
