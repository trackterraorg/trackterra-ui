import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import fileDoneOutline from '@iconify/icons-ant-design/file-done-outline';
import creditCardOutline from '@iconify/icons-eva/credit-card-outline';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = (address) => [
  {
    title: 'Dashboard',
    path: `/account/${address}/dashboard`,
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Transactions',
    path: `/account/${address}/txs/regular`,
    icon: getIcon(creditCardOutline)
  },
  {
    title: 'Koinly',
    path: `/account/${address}/txs/koinly`
    // icon: getIcon(creditCardOutline)
  },
  {
    title: 'Cointracker',
    path: `/account/${address}/txs/cointracker`
    // icon: getIcon(creditCardOutline)
  },
  {
    title: 'Supported protocols',
    path: `/account/${address}/protocols`,
    icon: getIcon(fileDoneOutline)
  }
];

export default sidebarConfig;
