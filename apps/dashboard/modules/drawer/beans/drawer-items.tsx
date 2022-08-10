import { DrawerItem } from '@dashboard/modules/drawer/types/drawer-item';
import DataSetSelector from '@dashboard/modules/encoding-preferences/data-set-selector/views/DataSetSelector';

const drawerItems: DrawerItem[] = [
  {
    title: 'Data Set Selection',
    description: 'Select data to generate recommendations for',
    component: <DataSetSelector />,
  },
];

export default drawerItems;
