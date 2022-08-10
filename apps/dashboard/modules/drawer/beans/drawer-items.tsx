import { DrawerItem } from '@dashboard/modules/drawer/types/drawer-item';
import DataColumnSelector from '@dashboard/modules/encoding-preferences/data-column-selector/views/DataColumnSelector';
import DataSetSelector from '@dashboard/modules/encoding-preferences/data-set-selector/views/DataSetSelector';

const drawerItems: DrawerItem[] = [
  {
    title: 'Data Set Selection',
    description: 'Select data to generate recommendations for',
    component: <DataSetSelector />,
  },
  {
    title: 'Data Column Selection',
    description: 'Select data columns to be used in the visualizations',
    component: <DataColumnSelector />,
  },
];

export default drawerItems;
