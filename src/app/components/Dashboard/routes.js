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
import WithdraWrongAddress from './Exchange-Wallet/Withdraw/WithdraWrongAddress';
import WithdraSuccessAddress from './Exchange-Wallet/Withdraw/WithdraSuccessAddress';

const dashboardRoutes = [
  {
    path: '/balances',
    name: 'Balances',
    heading: 'Balances',
    component: Balances,
    layout: '/dashboard',
  },
  {
    path: '/deposits/BTC',
    name: 'BTC',
    heading: 'BTC Details',
    component: DepositCoins,
    layout: '/dashboard',
  },
  {
    path: '/deposits/USDT',
    name: 'USDT',
    heading: 'USDT Details',
    component: DepositCoins,
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
    path: '/withdraw/BTC/address',
    name: 'BTC Address',
    heading: 'BTC Details',
    component: WithdraSuccessAddress,
    layout: '/dashboard',
  },
  {
    path: '/withdraw/USDT/address',
    name: 'USDT Address',
    heading: 'USDT Details',
    component: WithdraSuccessAddress,
    layout: '/dashboard',
  },
  {
    path: '/withdraw/BTC',
    name: 'BTC',
    heading: 'BTC Details',
    component: WithdrawCoins,
    layout: '/dashboard',
  },
  {
    path: '/withdraw/USDT',
    name: 'USDT',
    heading: 'USDT Details',
    component: WithdrawCoins,
    layout: '/dashboard',
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    heading: 'Withdraw',
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
  {
    path: '/futures',
    name: 'Futures Wallet',
    heading: 'Futures',
    component: FuturesTransfer,
    layout: '/dashboard',
  },
  {
    path: '/options',
    name: 'Options Wallet',
    heading: 'Options',
    component: OptionTransfer,
    layout: '/dashboard',
  },
];

export default dashboardRoutes;
