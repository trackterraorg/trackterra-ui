import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import fileDoneOutline from '@iconify/icons-ant-design/file-done-outline';
import creditCardOutline from '@iconify/icons-eva/credit-card-outline';
import refreshOutline from '@iconify/icons-eva/refresh-outline';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = (chain, address) => [
  {
    title: 'Dashboard',
    path: `/account/${chain}/${address}/dashboard`,
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Transactions',
    path: `/account/${chain}/${address}/txs`,
    icon: getIcon(creditCardOutline)
  },
  {
    title: 'Supported protocols',
    path: `/account/${chain}/${address}/protocols`,
    icon: getIcon(fileDoneOutline)
  },
  {
    title: 'Reparse',
    path: `/account/${chain}/${address}/reparse`,
    icon: getIcon(refreshOutline)
  }
];

export default sidebarConfig;
